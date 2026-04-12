"""
dashboard.py — Playwright Test Results Dashboard
Run with: streamlit run dashboard.py
"""

from pathlib import Path

import pandas as pd
import plotly.express as px
import streamlit as st

# ── Config ────────────────────────────────────────────────────────────────────
st.set_page_config(page_title="Test Results Dashboard", layout="wide")

BASE_DIR = Path(__file__).resolve().parent

CSV_FILES = {
    "hackernews":        BASE_DIR / "hackernews"        / "test_results.csv",
    "nopcommerce":       BASE_DIR / "nopcommerce"       / "test_results.csv",
    "automationexercise": BASE_DIR / "automationexercise" / "test_results.csv",
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def normalize_browser(raw) -> str:
    """Strip suite-name prefix from browser column (e.g. 'automationexercise-webkit' → 'webkit').
    A project named after the suite with no suffix is the default Chromium project."""
    import math
    if raw is None or (isinstance(raw, float) and math.isnan(raw)):
        return "unknown"
    raw = str(raw).strip().lower()
    if not raw or raw == "nan":
        return "unknown"
    for b in ("chromium", "firefox", "webkit", "chrome", "safari", "edge"):
        if raw.endswith(b):
            return b
    # No known browser suffix → this is a suite-named Chromium project (e.g. "automationexercise")
    return "chromium"


def normalize_suite(row) -> str:
    """Fall back to folder name when suite column is 'unknown'."""
    if str(row["suite"]).strip().lower() in ("unknown", "", "nan"):
        return str(row["_source"]).strip()
    return str(row["suite"]).strip()



@st.cache_data(ttl=0)
def load_data() -> pd.DataFrame:
    frames = []
    for suite_key, csv_path in CSV_FILES.items():
        if not csv_path.exists():
            st.warning(f"CSV not found: {csv_path}")
            continue
        # on_bad_lines='skip' drops rows where error messages with newlines
        # broke the column count, which otherwise shift the suite name into
        # the browser column and produce spurious values like "automationexercise".
        df = pd.read_csv(csv_path, on_bad_lines="skip")
        df["_source"] = suite_key
        frames.append(df)

    if not frames:
        return pd.DataFrame()

    data = pd.concat(frames, ignore_index=True)

    # Normalise columns
    data["suite"]      = data.apply(normalize_suite, axis=1)
    data["browser"]    = data["browser"].apply(normalize_browser)
    data["status"]     = data["status"].str.strip().str.lower()
    data["duration_ms"] = pd.to_numeric(data["duration_ms"], errors="coerce").fillna(0)
    data["duration_s"] = data["duration_ms"] / 1000

    data["run_timestamp"] = pd.to_datetime(data["run_timestamp"], errors="coerce", utc=True)

    # Drop internal helper column
    data.drop(columns=["_source"], inplace=True)
    return data


# ── Load ──────────────────────────────────────────────────────────────────────
df_all = load_data()

# ── Sidebar filters ───────────────────────────────────────────────────────────
st.sidebar.title("Filters")


TARGET_DIRS = {"api", "components", "fixtures", "pages", "test-data", "tests", "utils"}
SKIP        = {"__pycache__", "node_modules", ".git"}
UNIT_PX  = 14   # SVG pixels per depth level (drives branch-line spacing)
UNIT_COL = 0.4  # Streamlit column units per depth level (drives column width)

# ── Pre-compute file keys, folder check keys, and the full filesystem file set ─
all_file_keys:   list[str] = []
all_folder_keys: list[str] = []
all_fs_files:    set[str]  = set()
for _sk in sorted(CSV_FILES):
    _suite_dir = BASE_DIR / _sk
    for _td in sorted(TARGET_DIRS):
        _tdir = _suite_dir / _td
        if _tdir.exists():
            all_folder_keys.append(f"fcheck_{_sk}_{_tdir}")
            for _fp in _tdir.rglob("*"):
                if _fp.is_file() and not _fp.name.startswith("."):
                    all_file_keys.append(f"fs_{_sk}_{_fp.relative_to(_suite_dir)}")
                    all_fs_files.add(_fp.name)
                elif _fp.is_dir():
                    all_folder_keys.append(f"fcheck_{_sk}_{_fp}")

# ── Framework (suite) filter ──────────────────────────────────────────────────
all_suites    = sorted(CSV_FILES.keys())
_suite_opts   = ["All"] + all_suites
sel_framework = st.sidebar.selectbox(
    "Website", _suite_opts,
    index=0,
)

# ── Browser / Status dropdowns ────────────────────────────────────────────────
_known_browsers = ["chromium", "firefox", "webkit"]
browsers    = ["All"] + sorted(set(df_all["browser"].dropna().unique().tolist()) | set(_known_browsers))
statuses    = ["All"] + sorted(df_all["status"].dropna().unique().tolist())
sel_browser = st.sidebar.selectbox("Browser", browsers, index=0)
sel_status  = st.sidebar.selectbox("Status",  statuses)

st.sidebar.caption("To update results, run tests locally and push the updated CSVs to GitHub.")

st.sidebar.divider()

# ── Folder tree ───────────────────────────────────────────────────────────────
# CSS: make folder-name buttons look like plain text links so only the SVG
# lines and icons are visible — no button borders or background.
# Primary buttons (Select All / Deselect All) are unaffected by this rule.
st.sidebar.markdown("""
<style>
[data-testid="stSidebar"] button[data-testid="baseButton-secondary"] {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 2px 4px !important;
    font-size: 0.83rem !important;
    color: inherit !important;
    width: 100% !important;
    display: block !important;
    text-align: left !important;
}
[data-testid="stSidebar"] button[data-testid="baseButton-secondary"] > div,
[data-testid="stSidebar"] button[data-testid="baseButton-secondary"] > p {
    display: block !important;
    text-align: left !important;
    width: 100% !important;
}
[data-testid="stSidebar"] button[data-testid="baseButton-secondary"] p {
    text-align: left !important;
    margin: 0 !important;
}
[data-testid="stSidebar"] button[data-testid="baseButton-secondary"]:hover {
    background: rgba(255,255,255,0.07) !important;
    border-radius: 3px !important;
}
</style>
""", unsafe_allow_html=True)


def branch_svg(prefix: str, is_last: bool, depth: int) -> str:
    """
    Return an inline SVG that draws the tree connector lines for one row.

    prefix  — string inherited from parent; each 4-char group encodes one ancestor
              level: "│   " means that ancestor still has siblings below (draw a
              continuing vertical guide); "    " means it was the last child.
    is_last — True when this node is the last child of its parent.
    depth   — 0 returns "" (root items need no connector).
    """
    if depth == 0:
        return ""
    STEP = UNIT_PX
    H    = 34          # SVG height ≈ button row height
    MID  = H // 2
    W    = depth * STEP
    COLOR, SW = "#888", "1.5"
    segs: list[str] = []

    # Ancestor guide lines: vertical continuations from ancestors with more siblings
    for i in range(depth - 1):
        chunk = prefix[i * 4 : (i + 1) * 4] if (i + 1) * 4 <= len(prefix) else "    "
        if chunk.startswith("│"):
            x = i * STEP + STEP // 2
            segs.append(
                f'<line x1="{x}" y1="0" x2="{x}" y2="{H}" '
                f'stroke="{COLOR}" stroke-width="{SW}"/>'
            )

    # Direct-parent connector (vertical part + horizontal branch)
    px    = (depth - 1) * STEP + STEP // 2
    y_end = H if not is_last else MID
    segs.append(
        f'<line x1="{px}" y1="0" x2="{px}" y2="{y_end}" '
        f'stroke="{COLOR}" stroke-width="{SW}"/>'
    )
    segs.append(
        f'<line x1="{px}" y1="{MID}" x2="{W}" y2="{MID}" '
        f'stroke="{COLOR}" stroke-width="{SW}"/>'
    )
    return (
        f'<svg width="{W}" height="{H}" '
        f'style="display:block;overflow:visible;flex-shrink:0;">'
        + "".join(segs) + "</svg>"
    )


def render_folder(path: Path, suite_key: str, depth: int,
                  prefix: str, is_last: bool) -> None:
    """
    Renders one folder row and, if expanded, its children.
    Does NOT mutate selected_files — collection is done by collect_selected_files().

    Layout (depth = 0):   [toggle btn | folder-name markdown          | checkbox]
    Layout (depth > 0):   [SVG branch lines | toggle btn | folder-name markdown | checkbox]

    A small arrow button is the expand/collapse trigger; the folder name is plain
    markdown so it is always left-aligned regardless of Streamlit's button styling.
    prefix  — ancestor connector string, e.g. "│       " (4 chars per level).
    is_last — True when this folder is the last sibling at its depth.
    """
    expand_key = f"folder_{suite_key}_{path}"
    check_key  = f"fcheck_{suite_key}_{path}"

    if expand_key not in st.session_state:
        st.session_state[expand_key] = False
    if check_key not in st.session_state:
        st.session_state[check_key] = True

    expanded     = st.session_state[expand_key]
    child_prefix = prefix + ("    " if is_last else "│   ")
    folder_icon  = "📂" if expanded else "📁"
    arrow        = "▼" if expanded else "▶"
    svg          = branch_svg(prefix, is_last, depth)

    if depth == 0:
        c_toggle, c_name, c_chk = st.columns([0.6, 5.4, 1])
    else:
        svg_w  = depth * UNIT_COL
        name_w = max(5.4 - svg_w, 1.0)
        c_svg, c_toggle, c_name, c_chk = st.columns([svg_w, 0.6, name_w, 1])
        c_svg.markdown(svg, unsafe_allow_html=True)

    if c_toggle.button(arrow, key=f"btn_{expand_key}"):
        st.session_state[expand_key] = not expanded
        st.rerun()
    c_name.markdown(f"{folder_icon} {path.name}")
    c_chk.checkbox("", key=check_key, label_visibility="collapsed", value=True)

    if expanded:
        children = sorted(path.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
        visible  = [c for c in children
                    if not c.name.startswith(".") and c.name not in SKIP]
        for i, child in enumerate(visible):
            child_is_last = (i == len(visible) - 1)
            if child.is_dir():
                render_folder(child, suite_key, depth + 1, child_prefix, child_is_last)
            else:
                fkey     = f"fs_{suite_key}_{child.relative_to(BASE_DIR / suite_key)}"
                file_svg = branch_svg(child_prefix, child_is_last, depth + 1)
                fsv_w    = (depth + 1) * UNIT_COL
                fn_w     = max(6.0 - fsv_w, 1.5)
                c_fsv, c_fn, c_fchk = st.columns([fsv_w, fn_w, 1])
                c_fsv.markdown(file_svg, unsafe_allow_html=True)
                c_fn.markdown(f"📄 {child.name}")
                c_fchk.checkbox("", key=fkey, label_visibility="collapsed", value=True)


def collect_from_folder(path: Path, suite_key: str, result: list) -> None:
    """
    Walk the folder tree and collect (suite_key, filename) pairs based on
    the current session_state — independent of whether any expander is open.
    """
    check_key  = f"fcheck_{suite_key}_{path}"
    expand_key = f"folder_{suite_key}_{path}"

    folder_on  = st.session_state.get(check_key,  True)
    is_expanded = st.session_state.get(expand_key, False)

    if not folder_on:
        return

    if is_expanded:
        # Expanded: respect individual file checkboxes
        children = sorted(path.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
        for child in children:
            if child.name.startswith(".") or child.name in SKIP:
                continue
            if child.is_dir():
                collect_from_folder(child, suite_key, result)
            else:
                fkey = f"fs_{suite_key}_{child.relative_to(BASE_DIR / suite_key)}"
                if st.session_state.get(fkey, True):
                    result.append((suite_key, child.name))
    else:
        # Collapsed + checked → include every file under this folder
        for fpath in path.rglob("*"):
            if fpath.is_file() and not fpath.name.startswith("."):
                result.append((suite_key, fpath.name))


def collect_selected_files() -> list[tuple[str, str]]:
    """Return all selected (suite_key, filename) pairs from session_state."""
    result: list[tuple[str, str]] = []
    for sk in sorted(CSV_FILES):
        suite_dir = BASE_DIR / sk
        for target_name in sorted(TARGET_DIRS):
            target_dir = suite_dir / target_name
            if not target_dir.exists():
                continue
            collect_from_folder(target_dir, sk, result)
    return result

# Select All / Deselect All buttons
_c1, _c2 = st.sidebar.columns(2)
if _c1.button("Select All", use_container_width=True, type="primary"):
    # Turn on every folder and every file checkbox
    for _k in all_file_keys + all_folder_keys:
        st.session_state[_k] = True
    st.rerun()
if _c2.button("Deselect All", use_container_width=True, type="primary"):
    # Only turn off folder-level checkboxes — file states stay True so that
    # re-selecting a folder immediately shows all its files again.
    for _k in all_folder_keys:
        st.session_state[_k] = False
    st.rerun()

st.sidebar.markdown("**📂 linfeng\_framework\_tests**")

# Render the tree UI (open/close, checkboxes) — does not collect selection
for suite_key in sorted(CSV_FILES):
    suite_dir = BASE_DIR / suite_key
    with st.sidebar.expander(f"📁 {suite_key}"):
        target_dirs = [
            suite_dir / t for t in sorted(TARGET_DIRS)
            if (suite_dir / t).exists()
        ]
        for i, target_dir in enumerate(target_dirs):
            render_folder(
                target_dir, suite_key, depth=0,
                prefix="", is_last=(i == len(target_dirs) - 1),
            )

# Collect selection from session_state — works regardless of expander open/closed state
selected_files: list[tuple[str, str]] = collect_selected_files()

# ── Apply filters ─────────────────────────────────────────────────────────────
from collections import defaultdict
df = df_all.copy()

# 1. File-tree filter
if selected_files:
    by_suite: dict[str, set[str]] = defaultdict(set)
    for suite_key, fname in selected_files:
        by_suite[suite_key].add(fname)
    mask = pd.Series(False, index=df.index)
    for suite_key, fnames in by_suite.items():
        mask |= (df["suite"] == suite_key) & (df["file"].isin(fnames))
        # Always include rows from files outside TARGET_DIRS (debug/temp — not toggleable)
        mask |= (df["suite"] == suite_key) & (~df["file"].isin(all_fs_files))
    df = df[mask].copy()
else:
    df = df.iloc[0:0]

# 2. Framework filter
if sel_framework != "All":
    df = df[df["suite"] == sel_framework]

# 3. Browser / Status
if sel_browser != "All": df = df[df["browser"] == sel_browser]
if sel_status  != "All": df = df[df["status"]  == sel_status]

# ── Title ─────────────────────────────────────────────────────────────────────
st.title("Playwright Test Results Dashboard")
st.caption(f"Showing {len(df):,} of {len(df_all):,} total records")

# ── KPI scorecards ────────────────────────────────────────────────────────────
if "drill_status" not in st.session_state:
    st.session_state.drill_status = None

n_all     = len(df)
n_passed  = (df["status"] == "passed").sum()
n_failed  = (df["status"] == "failed").sum()
n_skipped = (df["status"] == "skipped").sum()

k1, k2, k3, k4 = st.columns(4)
k1.metric("All",    f"{n_all:,}")
k2.metric("Passed", f"{n_passed:,}")

with k3:
    st.metric("Failed", f"{n_failed:,}")
    if st.button("View failed →", key="btn_failed", use_container_width=True):
        st.session_state.drill_status = "failed"

with k4:
    st.metric("Skipped", f"{n_skipped:,}")
    if st.button("View skipped →", key="btn_skipped", use_container_width=True):
        st.session_state.drill_status = "skipped"

st.divider()

# ── Middle section ────────────────────────────────────────────────────────────
col_left, col_right = st.columns(2)

# Drill-down table — individual failed / skipped tests  (LEFT)
with col_left:
    drill = st.session_state.drill_status
    label = drill.capitalize() if drill else "Failed / Skipped"
    st.subheader(f"{label} Tests")

    if drill is None:
        st.info("Click **View failed →** or **View skipped →** above to trace individual tests.")
    else:
        drill_df = df[df["status"] == drill].copy()
        if drill_df.empty:
            st.success(f"No {drill} tests in the current selection.")
        else:
            table_cols = ["error_message", "suite", "section", "test_title", "browser", "duration_s"]
            table_cols = [c for c in table_cols if c in drill_df.columns]
            st.dataframe(
                drill_df[table_cols]
                .rename(columns={
                    "error_message": "Error",
                    "suite":         "Suite",
                    "section":       "Section",
                    "test_title":    "Test",
                    "browser":       "Browser",
                    "duration_s":    "Duration (s)",
                })
                .sort_values(["Suite", "Section", "Test"])
                .reset_index(drop=True),
                use_container_width=True,
                height=350,
            )
        if st.button("Clear", key="btn_clear"):
            st.session_state.drill_status = None
            st.rerun()

# Bar chart — avg speed by browser  (RIGHT)
with col_right:
    st.subheader("Avg Execution Time by Browser")
    if not df.empty:
        browser_avg = (
            df.groupby("browser")["duration_s"]
            .mean()
            .reset_index()
            .rename(columns={"duration_s": "avg_duration_s"})
            .sort_values("avg_duration_s")
        )
        fig_bar = px.bar(
            browser_avg,
            x="browser",
            y="avg_duration_s",
            text_auto=".2f",
            labels={"browser": "Browser", "avg_duration_s": "Avg Duration (s)"},
            color="browser",
            color_discrete_sequence=px.colors.qualitative.Set2,
        )
        fig_bar.update_layout(showlegend=False, margin=dict(t=20, b=20))
        st.plotly_chart(fig_bar, use_container_width=True)
    else:
        st.info("No data for selected filters.")

st.divider()

# ── Raw data table ────────────────────────────────────────────────────────────
st.subheader("Raw Data")

display_cols = [
    "run_timestamp", "suite", "section", "subfolder", "file",
    "test_title", "status", "duration_s", "retry", "browser",
    "error_message",
]
display_cols = [c for c in display_cols if c in df.columns]

st.dataframe(
    df[display_cols]
    .sort_values("run_timestamp", ascending=False)
    .reset_index(drop=True),
    use_container_width=True,
    height=400,
)