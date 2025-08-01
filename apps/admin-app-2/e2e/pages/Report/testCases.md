# Report Test Cases

## Sidebar Menu

- [x] It should be under the Business Monitoring.
- [x] Collapse Reports.
- [x] Click on Reports.
- [x] URL: Confirm that the page navigates to https://admin.develop.getirapi.com/reports?country=tr 

## Create New Report

- [x] Verify that the Create new report section is collapsible.
- [x] It should include the Report Type filter and the Create button.
- [x] Observe that a dropdown menu opens when the Report Type filter field is clicked.
- [x] The Create button should be inactive if no report type is selected.
- [x] Select any report type and confirm that the Create button becomes active.
- [x] Click on the Create button.
- [x] Confirm that it navigates to the New Report Request page: https://admin.develop.getirapi.com/reports/new/61d6deb33b1694267cf24516?country=tr.
- [x] Check report creation flow. (Report Creation flow tests are moved into this file)

## Filter Reports

- [x] Verify that the Filter Reports section is collapsible.
- [x] Confirm that it contains the Date Range, Listing Type filters, and the Apply button.
- [x] Click on the Date Range filter,
  -  Selecting Start and End Dates
      - [x] Click on the start date field.
      - [x] Select a start date from the calendar dropdown menu.
      - [x] Click on the end date field.
      - [x] Select an end date from the calendar dropdown menu.
      - [x] Confirm that the selected dates are correctly reflected in the start and end fields.
  - Invalid Date Entry
    - [x] Enter a date in the end date field.
    - [x] Dates after the selected end date should be disabled.
    - [x] Dates before the selected start date should be selectable.
    - [] Confirm that an appropriate error message is displayed by the system.
  - Default Date
    - [x] By default, the start date should be yesterday and the end date today.
  - Maximum and Minimum Date Constraints
    - [x] Select the maximum date allowed by the component
    - [x] Select the minimum date allowed by the component.
    - [x] The selected dates should span a maximum of 1 month.
  - Setting Dates by Typing:
    - [x] Filter the start and end dates by typing on the keyboard.
- Listing Type Filter:
  - [x] Click on the Listing Type filter.
  - [x] There should be two options in the dropdown
    - Created by Me
    - Created from report types I have permission for

## Report Table
- [x] Should include the headers: #, Name, Report Type, Request Date, Status, and URL.
- [x] Reports should be listed according to the selected filters.
- [x] The request date should fall within the selected date range.
- [x] If the Status is Ready, the download link should be visible.

## Pagination

- [x] Confirm that the page limit values are 10, 25, 50, 100.
- [x] Verify that the order list contains the selected number of rows for any limit selection.
- [ ] Confirm that the page navigates to the selected page using the next and back arrow buttons in pagination. (Since data amount is not enough, this test is not applicable. But tested via filling the pagination input with the page number.)
- [x] Observe that entering a page number as text opens the respective page (e.g., entering “3” in the page number should navigate to the 3rd page).
