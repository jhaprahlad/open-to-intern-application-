## Open to Intern Documentation

This documentation provides an overview of the Open-to-Intern project and its requirements. Open-to-Intern is a software project aimed at managing college and intern data for an internship platform.
### Project Requirements

#### Models

- **College Model**
  - **name**: A mandatory and unique field representing the abbreviated name of the college (e.g., "iith").
  - **fullName**: A mandatory field representing the full name of the college (e.g., "Indian Institute of Technology, Hyderabad").
  - **logoLink**: A mandatory field representing the URL of the college's logo.
  - **isDeleted**: A boolean field with a default value of false, indicating whether the college is deleted.

- **Intern Model**
  - **name**: A mandatory field representing the name of the intern.
  - **email**: A mandatory and unique field representing the email of the intern. It should be a valid email address.
  - **mobile**: A mandatory and unique field representing the mobile number of the intern. It should be a valid mobile number.
  - **collegeId**: An ObjectId field referencing the College model.
  - **isDeleted**: A boolean field with a default value of false, indicating whether the intern is deleted.

#### POST /functionup/colleges

This endpoint is used to create a new college document. The request should include the following fields:

- **name**: The abbreviated name of the college.
- **fullName**: The full name of the college.
- **logoLink**: The URL of the college's logo.

The endpoint expects a POST request to the following URL: `BASE_URL/functionup/colleges`.

#### POST /functionup/interns

This endpoint is used to create a new intern document. The request should include the following fields:

- **name**: The name of the intern.
- **mobile**: The mobile number of the intern.
- **email**: The email address of the intern.
- **collegeName**: The name of the college where the intern is associated.

The endpoint expects a POST request to the following URL: `BASE_URL/functionup/interns`.

If the document creation is successful, the server should return a JSON object representing the created document and a response with HTTP status 201. If the request is invalid, the server should return an HTTP status 400 with an error response structure.

#### GET /functionup/collegeDetails

This endpoint is used to retrieve the details of a college and the list of interns who have applied for internships at that college. The request should include the following query parameter:

- **collegeName**: The abbreviated name of the college.

The endpoint expects a GET request to the following URL: `BASE_URL/functionup/collegeDetails`.

The server should return a response with the college details and the list of interns who have applied for internships at that college.



For additional information about project requirements, refer to the provided sources:

1. How to Write Project Requirements | Smartsheet. [[1](https://www.smartsheet.com/content/project-requirements)]
2. Tips for Technical Requirements Documents | Smartsheet. [[2](https://www.smartsheet.com/wise-words-about-writing-technical-requirements-documents)]
3. A Guide to Different Requirements Documentation - Indeed. [[3](https://ca.indeed.com/career-advice/career-development/requirements-documentation)]
4. Technical Documentation Intern
