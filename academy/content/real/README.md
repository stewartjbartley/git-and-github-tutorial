# Real chart data

Drop CSV exports here and reference them from a lesson with a `real` block (see `lib/realChart.ts`).

**TradingView:** open the chart, set the timeframe, then use the layout menu: Export chart data. Choose "Time format: ISO".
**MT5:** Tools > History Center, select the symbol and timeframe, Export.

Needed columns: open, high, low, close (header names are matched case-insensitively). A time column is optional.
Check your data licence before publishing it in a paid course. Exports of your own broker's data are usually fine
for short educational excerpts, but exchange and vendor terms differ, so confirm with the platform you export from.
