Blog Project - Microservices Architecture
Overview
This project is a microservices-based blog application built using Node.js for the backend services and React for the frontend. The application simulates a database for each service using in-memory variables, providing a lightweight and fast environment for development and testing. Asynchronous communication between services is achieved through an event bus, facilitating a publisher-subscriber pattern for event-driven architecture.

Features
Microservices Architecture: Each service is designed to be independent and self-contained, enhancing modularity and scalability.
In-Memory Data Storage: Simulated databases for each service using in-memory variables, eliminating the need for a real database in this demonstration setup.
Asynchronous Communication: Services communicate asynchronously using an event bus, which ensures decoupling and efficient message passing.
Event-Driven Design: Implements a publisher-subscriber pattern where services can publish and subscribe to events, enabling real-time updates and interactions.
Services
1. Posts Service
Handles creating, updating, and retrieving blog posts.

2. Comments Service
Manages comments for each blog post, including adding, updating, and retrieving comments. Comments undergo a validation process by an independent moderation service.

3. Moderation Service
Responsible for moderating content, ensuring that posts and comments adhere to community guidelines. Specifically, it checks each comment for inappropriate content. If a comment contains the word orange, the comment is suspended.

4. Query Service
Aggregates data from various services to provide comprehensive views of blog posts and their associated comments.

Comment Processing Workflow
Creation: A comment is created and initially stored in the Comments Service.
Validation: The Moderation Service checks the validity of the comment.
If the comment contains the word **orange**, its status is updated to suspended.
Status Update: The Comments Service receives the validation result and updates the comment's status accordingly.
