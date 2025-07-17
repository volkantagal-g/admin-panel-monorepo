# ActiveOrderForSummary Test Cases
# Sidebar Menu:

-  ✅ **Under GetirMarket menu:**
  - Ensure "Active Orders Summary" is selected in the Order section.

- ✅ **Under Management menu:**
  - Ensure "G.Act Ord Sum." is actively selected.

- ✅ **Under n11 menu:**
  - Ensure "Active Orders Summary" is present.

# Filter:

- ✅ Verify that the filter area contains the following filters in order: Domain type, Integration type, City, Warehouse.

## Domain Type:

- ✅ Open the Domain type dropdown and verify the presence of Getir10, GetirMore, and GetirWater domains.
- Verify that a default domain is selected.

## Integration Type:

- ✅ Verify the "Integration Type" placeholder in the Integration Type filter.
- ✅ Click on the Integration Type filter and verify that the types returned by the service are listed (currently only n11).
- ✅ Select a type.
- ✅ Click the “x” button and verify that the type selection is removed.
- ✅ Enter text and verify that the list is filtered according to the text entered, then click.

## City:

- ✅ Verify the "City" placeholder in the City filter.
- ✅ Click and observe that cities are listed. Verify Istanbul selection.
- ✅ Select a city from the dropdown menu.
- ✅ Click the “x” button and verify that the selection is removed.
- ✅ Enter text and observe that the list is filtered according to the text entered (e.g., entering “Anka” filters “Ankara”), then click.

## Warehouse:

- ✅ Verify the "Warehouse" placeholder.
- ✅ Check that it becomes active after selecting a city.
- ✅ Verify that warehouses are filtered according to the selected city.
- ✅ Select one or more warehouses.
- ✅ Click the “x” button and verify that the selection is removed.
- ✅ Enter text and observe that the list is filtered according to the text entered, then click.
- ✅ If no city is selected, the warehouse filter should be disabled.

- Verify that the "Product" button is on the right side of the filter area.
- ✅ Click the Product button.

# Product Filter:

- ✅ Verify the “Total Product Count” header in the opened window.
- ✅ Verify the Search area.
- ✅ Verify the “Search” placeholder.
- ✅ Click and enter text.
- Observe if products are listed according to the searched text.
- ✅ The product list should be clickable.
- ✅ When a product is clicked, it should navigate to /marketProduct/detail/… page.
- By default, products should be sorted from highest to lowest total count.
- Check if the sorting for Product and Total works.
- Verify if there is a scroll.
- ✅ Click the “x” close button.
- ✅ Verify that the window is closed.

# Statistics Table:

- ✅ Verify the boxes: Active Orders, Total Discount, Avg. Discount, Avg. Basket.
- Verify that data is coming.
- The number of Active Orders should be returned.
- ✅ The others should return data in TRY.

# Charts:

- ✅ Promo Distribution, Payment Type, Address Type, Promo Type, Total Discount, Queue Status charts and data should be present (in the same order).

### Promo Distribution:

- Should have Organic and Promo breakdowns.
- Shares should be shown as percentages.
- When clicking on Organic, only organic orders should be filtered in the chart.
- When clicking on Promo, only promo orders should be filtered in the chart.
- When filtering, observe and verify that the "Chart Filters" filter is created above the charts and the selected filter is added.

### Payment Type:

- Should have breakdowns: C. Card, BKM, Slice?
- Shares should be shown as percentages.
- When any payment type is selected, the share of the selected type should be seen in the chart.
- When filtering, observe and verify that the "Chart Filters" filter is created above the charts and the selected filter is added.

### Address Type:

- Should have breakdowns: Office, Home, Work, Unknown.
- Shares should be shown as percentages.
- When any address type is selected, the share of the selected type should be seen in the chart.
- When filtering, observe and verify that the "Chart Filters" filter is created above the charts and the selected filter is added.

### Promo Type:

- Should have breakdowns: Acquisition, Habit Building, Discount Code.
- Shares should be shown as percentages.
- When any promo type is selected, the share of the selected type should be seen in the chart.
- When filtering, observe and verify that the "Chart Filters" filter is created above the charts and the selected filter is added.

### Total Discount:

- Observe the Getir breakdown.
- Shares should be shown as percentages.
- When any payment type is selected, the share of the selected type should be seen in the chart.

### Queue Status:

- Observe breakdowns: Uninvolved, Enqueued, Dequeued.
- Shares should be shown as percentages.
- When any queue status is selected, the share of the selected type should be seen in the chart.
- When filtering, observe and verify that the "Chart Filters" filter is created above the charts and the selected filter is added.

# Promos Table:

- ✅ The table headers should be: #, Promo Code, Type, Warehouse Count, Total Discount(₺), Avg. Discount(₺), Avg. Basket(₺), Order Count, Action.
- ✅ Sorting should be available for all columns except # and Action.
- Check if the sorting works correctly.
- ✅ By default, the Order Count should be sorted in descending order.
- Verify that data is correctly populated under each heading.
- ✅ The Action column should have "Detail" buttons.
- ✅ Click the detail of any promo.
- ✅ A new tab should open: https://admin.develop.getirapi.com/promo/detail/…
- ✅ Verify that the promo detail page is opened.
- The page should be scrollable.

