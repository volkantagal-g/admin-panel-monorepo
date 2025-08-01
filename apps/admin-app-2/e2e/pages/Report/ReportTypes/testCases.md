# Report Type Test Cases
# Sidebar Menu:

-  ✅ **Under Reports menu:**

# Filter:

- ✅ Verify that the filter area contains the following filters in order: Search, Report Tag.
- ✅ Check "_new report type_" detail button.

## Search:

- ✅ Select "_Search_" and fulfill the search area.

## Report Tag:

- ✅ Click and observe that tags are listed.
- ✅ Select a tag from the dropdown menu.

## Table Area:
- ✅ Verify the searched report type is displayed in the table
- ✅ Verify the report type detail button is clickable and navigates to the report detail page.
- ✅ Verify the table headers: #, Name, Description, Tags and Detail.
- ✅ Verify the Name column is sorted in ascending order by default.

## Report Type Detail Page:

- ✅ Verify "_Report Type Detail_" header.
- ✅ Verify Report Type Inputs are visible. 
  'Name (TR)',
  'Name (EN)',
  'Description (TR)',
  'Description (EN)',
  'Instructions (TR)',
  'Instructions (EN)',
  'Script File',
  'Tags',
- ✅ Verify the "Active" checkbox is disabled and checked by default.
- ✅ Verify tags are listed.
- ✅ Verify the "Parameters" header.
- ✅ Verify the parameter's inputs are visible.
   'Variable Type', 'Variable Name', 'Parameter Name (TR)', 'Parameter Name (EN)'
- ✅ Click the "Edit" button.
- ✅ Verify "Active" checkbox is enabled.
- ✅ Click the  "Add Parameter" button.
- ✅ Fulfill the "Instructions" inputs.
- ✅ Click the "Save" button.
- ✅ Get "Cannot be empty" error message for the empty fields in the parameter section.
- ✅ Delete the added parameter section and clean the "Instructions" inputs.
- ✅ Click the "Save" button.
- ✅ Verify the toast message is displayed.

### Check the "Delete" button action:
- ✅ Click the "Edit" button.
- ✅ Click the "Delete" button.
- ✅ Verify the confirmation modal is displayed.
- ✅ Click the "Cancel" button.
- ✅ Verify the modal is closed.
- ✅ Click the arrow button to back to the report type list page.

## Create a New Report Type and Delete:

- ✅ Click the "_new report type_" detail button.
- ✅ Verify Report Type Inputs are visible.
- ✅ Fulfills the inputs.
- ✅ Click the "Active" button.
- ✅ Click the "Add Parameter" button.
- ✅ Fulfill the Parameter inputs.
- ✅ Click the "Create" button.
- ✅ Back to the report type list page.
- ✅ Verify the created report type is displayed in the table.
- ✅ Go to the report type detail page.
- ✅ Verify the created report type detail page.
- ✅ Click the "Edit" button.
- ✅ Click the "Delete" button.
- ✅ Verify the confirmation modal is displayed.
- ✅ Click the "Ok" button.
- ✅ Go back to the report type list page.
