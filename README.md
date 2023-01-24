# free-lunch-app-alegra-backend:
<h3>Introduction</h3>
<p>free-lunch-app-backend is a web application server built using a microservices architecture, it has an api gateway and two microservices all written in nodejs using express and typescript, plus each microservice is connected to a mongo database db and to an instance of rabbitMQ used to share the events.</p>
<h3>Intalation Guide</h3>
<p>Everything is written to work with docker compose so run the command:</p>
<code>
  docker compose up
</code>

<p>Once the containers have been lifted, we must proceed to fill in the initial data of the databases, we can do this by executing in the containers of the kitchen and storage microservices:</p>
<code>
  npm run populate_database
</code>

<p>and that's all you can start using our api</p>
<h3>Test</h3>
<p>To test that our microservices are working properly, you can run the command in any of them:</p>
<code>
  npm run populate_database
</code>
