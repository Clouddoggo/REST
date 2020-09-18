# Instructions to run

1. Clone this repository

   ```bash
   git clone https://github.com/Clouddoggo/OTOT-Task-B.git
   ```

2. Go to the cloned folder

   ```bash
   cd OTOT-Task-B
   ```

3. Run `node index` or `nodemon index`
4. Go to http://localhost:8080. You should see a welcome page.
5. Go to http://localhost:8080/api/contacts to view the contacts in the list.

# Instructions to add, delete or edit a contact

1. Run POSTMAN or any other applications capable of sending API requests to a server
2. To add, send a request to http://localhost:8080/api/contacts using POST
3. To delete, retrieve the id of the contact you wish to delete using GET. then append it to the server URL and make a DEL request
4. To edit, retrieve the id of the contact you wish to delete using GET. then append it to the server URL and make a PUT request