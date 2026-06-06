# Search And Filter Behavior Fix Report

## Fixed

Homepage search now uses `state.searchQuery` for the search results panel instead of `state.filters.query`.

## Effect

- Typing into homepage search shows quick results.
- It no longer silently filters/hides all site sections.
- Reset filters clears the search query and the panel.

## Still Recommended

A future pass should add richer result deep links to specific cards rather than only section anchors.
