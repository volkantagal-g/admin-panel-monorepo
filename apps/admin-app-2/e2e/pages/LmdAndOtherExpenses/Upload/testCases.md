# LMD And Other Expenses Test Cases
## Sidebar Menu & URL:

-  ✅ It should be under the Business Monitoring.
-  ✅ Click on LMD&Other Expenses.
-  ✅ Confirm that the page navigates to this URL: https://admin.develop.getirapi.com/lmdAndOtherExpenses/upload?country=tr 

## Filter and Buttons Area::

- ✅ Verify expense type filter, download template button, and upload button.

## Download and Upload Actions:

- ✅ Click expense type filter.
- ✅ Verify 3 types of cost: LMD Cost, Logistic Cost, and Other Cost.
- ✅ Select a cost type.
- ✅ Click the “Download template” button.
  - ✅ The file to be downloaded should be in CSV Format.
  - ✅ The selected cost type of the CSV file is downloaded in your local.
-  ✅ Click the “Upload” button.
    - ✅ Verify that the instructions for the “upload csv” model are opened.
    - ✅ Verify that the “Choose File”, “Upload” and “Cancel” buttons.
    - ✅ Click the Cancel button, the modal is closed.
    - ✅ If a file is not uploaded, the “Upload” button should be inactive.
    - ✅ Click the “Choose file” button.
    - ✅ Select a CSV which should be selected cost type.
    - ✅ The Upload button should be active.
    - ✅ Click the “Upload” button.
    - ✅ The file is uploaded and uploadLastMileDeliveryCost gets 200 for LMD cost.
    - ✅ Upload valid 3 different costs
       
       - ✅ Last Mile Delivery Cost
       - ✅ Logistic Cost
       - ✅ Other Cost
         
          - ✅ Verify that it is loaded.
   - ✅ Upload invalid 3 different costs

     - ✅ Last Mile Delivery Cost
     - ✅ Logistic Cost
     - ✅ Other Cost
       - ✅ Verify that occur an error and related warning message.
  - ✅ CSV file content;
    
    - ✅ It must not contain empty cells. 
    - ✅ Only 1 month of data should be uploaded at a time. 
    - ✅ It should contain the headings specified in the sample format, and the heading names should not be changed. 
    - ✅ Domain names should be Getir10, GetirMore, GetirFood, GetirLocals, GetirWater for LMD and Logistic costs. 
    - ✅ Domain names should be Getir10, GetirMore, GetirFood, GetirLocals, GetirWater, and GetirWaterMarketplace for Other Cost. 
    - ✅ If the same month, year and domain data is uploaded in different files, only the data in the last file is processed into the system and the old data is deleted regardless of considering the included warehouse IDs. 
    - ✅ Month selection must be between 1 and 12, and year selection must be between 2016 and 2050. 
    - ✅ Financial values must not contain negative data and the decimal separator of the values must be dot (.).


 








