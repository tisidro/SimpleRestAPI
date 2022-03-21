"# SimpleRestAPI" 

In this project, I was able to set up an api with routes that allow you to create, update, delete for subscribers to a youtube channel. Instead of update I used patch, so it only updates one item of the subscriber schema. 

It uses a mongodb w/ mongoose connection on localhost (not an existing database online).

The routes are tested using rest client extension instead of Postman so it can be easily tested right in VS Code. If you go to the routes.rest in the routes folder you can test the routes by clicking the "send request" link above each route. 

Of course you have to first create some subscribers, so I suggest you do that and then you can try deleting (copy the id you want to delete from a subscriber you created and then paste it on the end of the route). After, you can paste a subscriber you  have not deleted at the end of the patch route, change the name, and you will see on the test panel that the name has updated.

:)
