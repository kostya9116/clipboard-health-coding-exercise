# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Modify the Database to store Facility-specific Agent IDs
___

**Description:** To support custom Agent IDs for each Facility, we need to modify our database structure. This would involve creating a new table that will hold the Facility-specific Agent IDs. This table will relate to both the Facility and Agent tables.

**Acceptance Criteria:**
<ul>
<li>The new table "Facility_Agent" is successfully created.</li>
<li>The table should have at least four fields: an auto-incrementing ID, the Facility's ID, the Agent's ID, and the custom Agent ID as provided by the Facility.</li>
<li>Appropriate relationships are set up with the Facility and Agent tables.</li>
</ul>

**Time/Effort Estimate:** 4 hours

**Implementation Details:** Add the necessary migration to introduce the new table. The migration should create the "Facility_Agent" table and create relationships with the Facility and Agent tables. Ensure the custom Agent ID field is added. Also, be sure to implement the ‘revert’ method in the migration.

### Ticket 2: Create API Endpoint to allow Facilities to input their custom Agent IDs
___

**Description:** To provide the functionality to input custom Agent IDs, we need to create an API endpoint that will take the Facility's ID, the Agent's ID, and the custom Agent ID as input.

**Acceptance Criteria:**
<ul>
<li>
The new API endpoint is successfully implemented.
</li>
<li>
The endpoint correctly stores the custom Agent ID in the database.
</li>
<li>
When a Facility tries to input a custom ID for an Agent, check if a record already exists in the Facility_Agent table for that Facility-Agent combination. If a record does exist, update it with the new custom ID, rather than creating a new record.
</li>
<li>
Error handling:
    <ul>
      <li>If a Facility tries to input a custom ID for an Agent with which they have no relationship(not worked), return an appropriate error message.</li>
      <li>If the input data is incorrectly formatted (for example, non-numeric IDs where numeric ones are expected), return an error message.</li>
    </ul>
</li>
<li>
Make sure to do Input validation
    <ul>
        <li> Check that the Facility ID, Agent ID, and custom ID fields are not empty. </li>
        <li>Check that the Facility ID and Agent ID correspond to valid Facilities and Agents.</li>
        <li>Check that the custom ID does not contain any inappropriate characters or exceed the maximum length allowed for this field.</li>
    </ul>
</li>
<li>
Add a new endpoint to swager/postmen and write acceptance tests.
</li>
</ul>

**Time/Effort Estimate:** 5 hours

**Implementation Details:** Implement the endpoint in our existing API. Use the existing authentication and authorization mechanisms to ensure only authorized Facilities can set custom IDs. Implement the error handling and input validation as described in the acceptance criteria.


### Ticket 3: Modify getShiftsByFacility function to fetch custom Agent IDs
___

**Description:** To include custom Agent IDs in the data fetched by getShiftsByFacility, we need to modify this function to join the Shifts table with the Facility_Agent table.

**Acceptance Criteria:**
<ul>
<li>The getShiftsByFacility function returns the custom Agent IDs when available.</li>
<li>Existing functionality is not broken. (Existing unit tests pass.)</li>
<li>Additional unit tests for the new functionality pass.</li>
</ul>

**Time/Effort Estimate:** 3 hours

**Implementation Details:** Modify the getShiftsByFacility function to perform an appropriate SQL JOIN operation between the Shifts and Facility_Agent tables.


### Ticket 4: Modify the generateReport function to include custom Agent IDs
___

**Description:** The generateReport function needs to be updated to display the custom Agent IDs in the generated PDFs.

**Acceptance Criteria:**
<ul>
<li>The generateReport function includes custom Agent IDs in the reports when they are available.</li>
<li>If a custom ID isn't available, the function defaults to using the internal database ID.</li>
<li>Existing functionality is not broken. (Existing unit tests pass.)</li>
<li>Additional unit tests for the new functionality pass.</li>
</ul>

**Time/Effort Estimate**: 4 hours

**Implementation Details:** Update the generateReport function to add a new field for the custom Agent ID in the PDF. The value of this field should be sourced from the modified getShiftsByFacility function. If the custom ID is null, the internal database ID should be used.
