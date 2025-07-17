# ActiveOrderForOperation Test Cases


## URL Verification:

- [√] Ensure access to the specified URL: https://admin.develop.getirapi.com/marketOrderAnalytics/activeOrdersForOperation?country=tr

## Sidebar Menu:

- [√] Verify that "Operation Active Orders" is selected under the "Order" section in the "GetirMarket" menu.

## Filters Verification:

### Domain Type:

- [√] Verify that the dropdown lists Getir10, GetirMore, and GetirWater domains.

- [√] Check that a default domain is preselected.

### Integration Type:

- [ ] Verify the placeholder text "Integration Type".

- [√] Ensure that any integration type is listed when the dropdown is opened.

- [ ] Select a type and click the remove button to verify the selection is removed.

- [√] Ensure that typing in the text box filters and lists accordingly.

### City:

- [ ] Verify the placeholder text "City".

- [√] Ensure that cities are listed when the dropdown is opened.

- [ ] Select a city and click the remove button to verify the selection is removed.

- [√] Ensure that type “Istanbul” as text, “Istanbul” is listed, and then select it.

### Field Manager:

- [ ] Verify the placeholder text "Field Manager".

- [√] Type and select any Field Manager

- [√] Ensure that field managers are listed when the dropdown is opened.

- [ ] Select a field manager and click the remove button to verify the selection is cleared.


### Courier Name:

- [√] Enter a courier name and select one from the dropdown list.

- [ ] After observing the order list, click the remove button to verify that the selection is removed.

### Warehouse:

- [ ] Verify the placeholder text "Warehouse".

- [ ] Ensure it becomes all warehouses without city selection.

- [ ] Verify that the warehouses are filtered according to the selected city.

- [ ] Select one or more warehouses and click the remove button to verify the selection is removed.

- [√] Ensure that typing warehouses in the filter and lists accordingly.

### Status:

- [ ] Verify the placeholder text "Status".

- [ ] Select one or more statuses from the dropdown and then click the remove button to verify that the selection is removed.

- [ ] Verify the statuses; W.For Picker, Verifying, Preparing, Prepared, Handed over to Courier, On Way, Reached in the dropdown list.

- [√] Ensure that typing in the text box filter and lists accordingly.

### Duration:

- [√] Ensure the duration filter is disabled if no status is selected.

- [√] Ensure the duration filter becomes active when a status is selected.

- [ ] Enter minutes and observe that the up and down arrows increase and decrease the number.

- [ ] When the status filter is removed, the duration filter should be disabled and the input should be reset.

### Apply Button:

- [ ] Clicking the “Apply“ button should list the orders according to the selected filters.

### Order Table:

- [√] Verify that the headers and their respective data are displayed correctly.

- [ ] Ensure that warehouses in the Warehouse column appear as links and direct to the warehouse/detail page when clicked.

- [ ] Verify that sorting works for the “L.Act.” and “Sum” columns.

- [ ] Ensure that clicking the “Detail” button under Action header and the marketOrder/detail page is opened in a new tab.

### Pagination:

- [ ] Verify that the page limit values are 10, 25, 50, and 100.

- [ ] Ensure that selecting any limit updates the order list to show the chosen number of rows.

- [ ] Verify that the next and back arrow buttons in pagination navigate to the selected page.


 