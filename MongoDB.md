# 100 MongoDB Interview Questions

<br>
	
## 1. What is _MongoDB_ and what are its main features?

**MongoDB** is a robust, document-oriented NoSQL database designed for high performance, scalability, and developer agility.

### Key Features

#### Flexible Data Model

- Employs **JSON-like documents** (BSON format), facilitating complex data representation, deep nesting, and array structures.
- Provides dynamic schema support, allowing **on-the-fly data definition and data types**.
- Permits multi-document transactions within a replica set (group of nodes). **Sharding** extends this to support large distributed systems.

#### Indexed Queries

- Offers extensive indexing capabilities, such as single and multi-field support, **text**, **geospatial**, and **TTL** (Time to Live) Indexes for data expiration.
- Gives developers the tools needed to design and optimize query performance.

#### High Availability & Horizontal Scalability

- Uses replica sets for data redundancy, ensuring **auto-failover** in the event of a primary node failure.
- Adopts sharding to **distribute data across clusters**, facilitating horizontal scaling for large datasets or high-throughput requirements.

#### Advanced Querying

- Engages in **ad-hoc querying**, making it easy to explore and analyze data.
- Provides **aggregation pipeline**, empowering users to modify and combine data, akin to SQL GROUP BY.
- Specialized query tools like **Map-Reduce** and **Text Search** cater to distinctive data processing needs.

#### Embedded Data Management

- Encourages a rich, document-based data model where you can **embed related data** within a single structure.
- This denormalization can enhance read performance and data retrieval simplicity.

#### Rich Tool Suite

- Further augmented by several desktop and web-supported clients, MongoDB Atlas offers a seamless and unified experience for database management.
- Web-based MongoDB Compass handles query optimization and schema design.

#### Code Sample: Data Interaction with MongoDB

Here is the Javascript code:

```Javascript
const mongoose = require('mongoose');

# Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase',
 { useNewUrlParser: true, useUnifiedTopology: true }
 );
const db = mongoose.connection;

# Define a schema
const mySchema = new mongoose.Schema({
    key1: String,
    key2: String
});

# Define a model
const MyModel = mongoose.model('mycollection', mySchema);

# Insert a record
const newRecord = new MyModel({ key1: 'value1', key2: 'value2' });
newRecord.save()
    .then(result => {
        console.log(`Inserted record with id: ${result._id}`);
    })
    .catch(err => console.error('Error inserting record:', err));

# Query records
MyModel.find({ key1: 'value1' })
    .then(records => {
        console.log('Queried records:');
        records.forEach(record => console.log(record));
    })
    .catch(err => console.error('Error querying records:', err));

# Update record
MyModel.updateOne({ key1: 'value1' }, { $set: { key2: 'new_value' } })
    .then(updateResult => {
        console.log(`Modified ${updateResult.modifiedCount} records`);
    })
    .catch(err => console.error('Error updating record:', err));

# Delete record
MyModel.deleteOne({ key1: 'value1' })
    .then(deleteResult => {
        console.log(`Deleted ${deleteResult.deletedCount} records`);
    })
    .catch(err => console.error('Error deleting record:', err));

# Close the connection when done
db.close();

```

<br>

## 2. How does _MongoDB_ differ from relational databases?

While both **MongoDB** and relational databases handle data, they do so in fundamentally different ways. Let's explore the key distinctions.

### Data Model

#### Relational Databases

- Use tables with predefined schemas that **enforce relationships and data types**.
- Often use normalization techniques to minimize data redundancy.

#### MongoDB

- Stores data as **flexible, schema-less** sets of key-value pairs inside documents.
- Relationships can be represented through embedded documents or referencing via keys, providing more granular control and allowing for a more natural representation of real-world data.

### Data Integrity

#### Relational Databases

- Rely on **ACID transactions** to ensure data consistency.

#### MongoDB

- Offers **ACID guarantees** at the document level, though transactions across multiple documents happen within the same cluster to ensure consistency.
- Provides **multi-document transactions** for more complex operations.

### Query Language

#### Relational Databases

- Use SQL, a **declarative** query language.

#### MongoDB

- Employs **JSON-like** queries, which are **imperative** and resemble the structure of the data it operates on.

### Scalability

#### Relational Databases

- Traditionally use a **vertical scaling** approach, featuring limits on a single server's resources such as CPU, storage, and memory.

#### MongoDB

- Designed for **horizontal scaling**, making it easier to handle larger datasets and heavier loads by distributing data across multiple servers. This scalability also supports cloud-based setups.

### Performance

#### Relational Databases

- Can handle complex queries efficiently but might require multiple joins, potentially degrading performance.

#### MongoDB

- Optimized for quick CRUD operations and can efficiently handle large volumes of read and write requests.

### Indexing

#### Relational Databases

- Tables can have a multitude of indexes, which can be a mix of clustered, non-clustered, unique, or composite.

#### MongoDB

- Collections can have several indexes, including single field, compound, and multi-key indexes.

### Data Joins

#### Relational Databases

- Use joins to merge related data from different tables during a query, ensuring data integrity.

#### MongoDB

- Offers **embedded documents** and **manual reference** to achieve similar results, but multi-collection joins have performance and scalability considerations.
  <br>

## 3. Can you describe the structure of data in _MongoDB_?

In **MongoDB**, data units are organized into **collections**, which group related documents. Each **document** corresponds to a single **record** and maps to fields or **key-value pairs**.

### JSON-Like Format

Data in MongoDB is stored using a **BSON** (Binary JSON) format that can handle a maximum depth of 100 levels. This means a BSON object or element can be a document consisting of up to 100 sub-elements, such as fields or values.

#### Example: Nested Document

Here is a nested document:

```json
{
	"_id": "123",
	"title": "My Blog Post",
	"author": {
		"name": "John Doe",
		"bio": "Tech enthusiast"
	},
	"comments": [
		{
			"user": "Alice",
			"text": "Great post"
		},
		{
			"user": "Bob",
			"text": "A bit lengthy!"
		}
	]
}
```

In the example above, the "author" field is an embedded document (or sub-document), and the "comments" field is an array of documents.

### Key Features

- **Ad-Hoc Schema**: Documents in a collection don't need to have the same fields, providing schema flexibility.

- **Atomicity at the Document Level**: The `ACID` properties (Atomicity, Consistency, Isolation, Durability) of a transaction, which guarantee that the modifications are successful or unsuccessful as a unit of work.

- **Index Support**: Increases query performance.

- **Support for Embedded Data**: You can nest documents and arrays.

- **Reference Resolution**: It allows for processing references across documents. If a referenced document is modified or deleted, any reference to it from another document also needs to be updated or deleted in a multi-step atomic operation.

- **Sharding and Replication**: For horizontal scaling and high availability.

### Data Model Considerations

1. **One-to-One**: Typically achieved with embedded documents.

2. **One-to-Many (Parent-Child)**: This can be modelled using embedded documents in the parent.

3. **One-to-Many (Referenced)**: Achieved through referencing, where several documents contain a field referencing a single document. For better efficiency with frequent updates, consider referencing.

4. **Many-to-Many**: Modeled similarly to "One-to-Many" relationships.

5. **You should avoid** using “repeatable patterns”, such as storing data in separate arrays or collections, to ensure smooth data manipulation and effective query operations.

   For example, using separate collections for similar types of data based on a category like "users" and "admins" instead of a single "roles" array with multiple documents.

The above best practice example prevents **data redundancy** and ensures **consistency** between similar documents. Redundant storage or separating non-redundant data can lead to inconsistencies and increase the effort required for maintenance.
<br>

## 4. What is a _Document_ in _MongoDB_?

In MongoDB, a **document** is the basic data storage unit. It's a JSON-like structure that stores data in key-value pairs known as fields.

### Document Structure

Each **document**:

- Is a top-level entity, analogous to a row in a relational database.
- Is composed of **field-and-value** pairs, where the value can be a variety of data types, including arrays or sub-documents.
- Has a unique `_id` or primary key that is indexed for fast lookups.

Here is the document structure:

```json
{
	"_id": 1,
	"name": "John Doe",
	"age": 30,
	"email": "john.doe@email.com",
	"address": {
		"city": "Example",
		"zip": "12345"
	},
	"hobbies": ["golf", "reading"]
}
```

### Collections

Documents are grouped into **collections**. Each collection acts as a container with a unique namespace within a database. Collections don't enforce a predefined schema, which allows for flexibility in data modeling.

### Key Advantages

1. **Flexibility**: Documents can be tailored to the specific data needs of the application without adherence to a rigid schema.

2. **Data Locality**: Related data, like a user's profile and their posts, can be stored in one document, enhancing performance by minimizing lookups.

3. **JSON Familiarity**: Documents, being JSON-like, enable easier transitions between application objects and database entities.

4. **Indexing**: Fields within documents can be indexed, streamlining search operations.

5. **Transaction Support**: Modern versions of MongoDB offer ACID-compliant, multi-document transactions that ensure data consistency.

### Example Use Case

Consider an online library. Instead of having separate tables for users, books, and checkouts as in a relational database, you could store all the pertinent data about a user, including their checked-out books, in a **single document** within a `users` collection:

```json
{
	"_id": 1,
	"name": "John Doe",
	"email": "john.doe@email.com",
	"address": { "city": "Example", "zip": "12345" },
	"checkedOutBooks": [
		{ "bookId": 101, "dueDate": "2022-02-28" },
		{ "bookId": 204, "dueDate": "2022-03-15" }
	]
}
```

This approach enables swift retrieval of all pertinent user information in one go.

### Considerations

- **Atomicity**: While single-document operations are atomic by default in MongoDB, transactions and atomicity guarantee apply to multi-document operations primarily.
- **Size Limitations**: Documents can't exceed 16MB in size. In most cases, this limit should not be a practical concern.
  <br>

## 5. How is data stored in _collections_ in _MongoDB_?

In **MongoDB**, data is stored in **types of collections**, ensuring flexibility and efficiency in data modeling.

### Collection Basics

- Collections are the **primary data storage structures** in MongoDB, akin to tables in relational databases.
- They are schema-less, meaning that documents within a collection can have varying structures. This offers superior flexibility, while still allowing for structure validation through the use of JSON schema.

### Documents

- **Documents** serve as the unit of data storage in MongoDB. These are akin to rows in relational databases or objects in languages such as JavaScript.
- Documents are represented in **BSON** (Binary JSON) format, a binary representation closely mirroring JSON's attribute-value data model.

### Data Organization Hierarchy

- Data in MongoDB is organized in a **hierarchical structure**, with each database having one or more **collections**, each of which stores multiple **documents**, all of which can possess distinct structures.

### Key Data Principles

- MongoDB collections are designed to **optimize** data access rather than just serving as containers.
- To maximize efficiency, it's crucial to design collections that cater to common query patterns.

### Types of Database Collections

- By understanding the nuances of each collection type, you can better customize your MongoDB system to **cater to specific use-cases and performance requirements**.

#### AJAX Comments

- To effectively and iteratively store and manage comments, the AJAX Comments feature is engineered to provide a blend of flexibility and ease of access.
- It leverages **JSON-like documents** and the native power of MongoDB, such as **rich indexing** for efficient interactions.

#### Newsfeed Posts

- Tailored for sequential, feed-like content, such as posts from a social media platform or a messaging app.
- It benefits greatly from the ordered nature of **BSON documents**, making sure newer posts are easy to fetch.

#### User Profiles

- Focusing on user-defined, diverse, and possibly unstructured details, the User Profile collection is an ideal repository for self-descriptive user profiles.
- The **flexibility** of schema allows for comprehensive storage with minimal overhead.

#### Metadata

- For persistent and global configurations, the Metadata collection provides a secure space to cache system information.

#### Product Catalog

- Bolsters browsing and shopping activities by housing consistent, structured details related to products or services on offer.
- This attention to **consistency** helps in easy data retrieval and optimized user experiences.

#### Logging

- Ideally suited to record system interactions and debugging info, the Logging collection maintains an organized trail of system activity, nurturing a culture of informed decision-making.
  <br>

## 6. Describe what a _MongoDB database_ is.

A **MongoDB database** is a document-oriented, NoSQL database consisting of collections, each of which in turn comprise documents.

### Core Concepts

#### 1. Collection

- A collection is a grouping of MongoDB documents. A collection is the **equivalent of a table** in a relational database.

Advantages of Using Collections:

- **Flexibility**: Each document in a collection can have its own set of fields. Structural changes are easier to manage than in traditional, rigid SQL tables.
- **Scalability**: Collections can be distributed across multiple servers or clusters to handle large data volumes.

#### 2. Document

- Synonymous with a record, a **document** is the main data storage unit in MongoDB. It is a set of key-value pairs.

  - Key: The field name
  - Value: The data

**Document-Key Pairs**:

- Each document maintains a unique ID, known as the **object ID** which is autogenerated. This ensures every document is distinct.

- Unlike SQL databases where each row of a table follows the same schema, a document can be more fluid, accommodating fields as required.

Considerations When Choosing the Level of Normalization:

- **Optimized Reads**: Normalization into separate collections may be beneficial if there are large amounts of data that might not always have to be fetched.
- **Batch Inserts and Updates**: Denormalization often leads to simpler write operations. If there will be a lot of changes or inserts, denormalization can be more efficient.

- **Atomicity**: When data that belongs together is split into different collections, ensuring atomicity can become difficult.

#### 3. Field

- A **field** is a single piece of data within a document. It's synonymous with a database column.

  - **Field Type**: MongoDB supports multiple field types, including arrays.

  - **Limit on Nested Fields**: Documents can be nested, which is like being able to have sub-documents within a main document. However, there is a depth limitation: you can't embed documents endlessly.

#### Schema

MongoDB is often regarded as **schema-less**, but a more accurate description is that it's **flexible**. While documents within a single collection can have different fields, a robust schema design process is still essential.

Adapting to Evolving Schemas:

- **Versioning**: Managed schema changes and versioning in the application layer.

- **Schema Validation**: Introduced in MongoDB 3.2, this feature allows for the application of structural rules to documents.

- **Education and Training**: Properly educating developers on the use of a database can minimize potential misuse of its flexibility.

- **Use of Techniques to Ensure Data Integrity**: Techniques such as double-entry bookkeeping can assure data accuracy, especially when dealing with multiple, occasionally outdated records.

### Modeling vs. Tuning Approaches

- **Normalization**: Seeks to reduce redundancy and improve data consistency.

- **Denormalization**: Emphasizes performance gains. Redundancies are knowingly introduced for optimized and rapid reads.

- **Use Cases Dictate**: Neither is definitively superior; their suitability depends on the specific use case.
  <br>

## 7. What is the default _port_ on which _MongoDB_ listens?

The default **port number** for MongoDB is 27017. While it is possible to run multiple instances of MongoDB on the same machine, each instance must have its unique port number to ensure they don't conflict.
<br>

## 8. How does _MongoDB_ provide high availability and disaster recovery?

**MongoDB** ensures high availability and disaster recovery through a robust data architecture and a distributed system model. It integrates various mechanisms to maintain data integrity, uptime assurances, and data redundancy.

### Key Components

1. **Replica Sets**: These are clusters of MongoDB nodes that use automatic failover to maintain data consistency.

2. **WiredTiger Storage Engine**: It powers numerous features including data durability, in-memory storage, and compression.

3. **Oplog**: Short for "operations log", it records all write operations in an append-only manner.

4. **Write Concerns**: These are rules that determine the level of acknowledgment required for write operations.

5. **Read Preferences**: They define which nodes in a cluster can satisfy read operations.

6. **Data Centers**: Hardware resilience can be achieved by distributing nodes across multiple data centers.

7. **Backups and Restores**: MongoDB offers built-in mechanisms to backup and restore data, further aiding in disaster recovery.

8. **Monitoring Tools**: For performance tracking and potential issue detection.

9. **Technology Agnostic**: Can deploy on multi-cloud, hybrid and on-premises architectures.

### Data Recovery Modes

1. **Restore**: Achieved through the backup of data when the config server is the only component that is active and accurate. This method doesn't consider data changes made after the backup was captured.
2. **Oplog Replays**: This involves using oplogs that track changes, ensuring that even after a cluster restart, any missed transactions are reinstated.

3. **Snapshotting**: It is a consistent snapshot of data across the nodes in the replica set.

### Code Example: Write Concerns and Oplog

Here is the Javascript code:

```Javascript
const mongoose = require('mongoose');

# Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

# Assign the test database to a variable
const testDb = db.db('test');

# Assign the collection within the test database to a variable
const collection = testDb.collection('test_collection');

# Insert a document into the collection and set the write concern to 'majority'

collection.insertOne({ 'test_key': 'test_value' }, { writeConcern: { w: 'majority' } })
    .then(result => {
        console.log('Inserted document:', result.ops[0]);

        # Fetch the oplog entry associated with the insert operation.
        const oplogCursor = testDb.collection('local').collection('oplog.rs').find({ 'ns': 'test.test_collection', 'op': 'i' });

        # Access the result and compare the count to ensure the operation was recorded in the oplog.
        oplogCursor.count()
            .then(operationCount => {
                console.log('Operation count in oplog:', operationCount);
            })
            .catch(err => console.error('Error fetching oplog entry count:', err));
    })
    .catch(err => console.error('Error inserting document:', err));

# Close the connection when done
db.close();

```

### Recommendations

- Employ consistent and comprehensive **backup** strategies in conjunction with multi-faceted recovery plans.
  <br>

## 9. What are _indexes_ in _MongoDB_, and why are they used?

**Indexes** are employed in **MongoDB** to optimize database queries by providing faster access to data. Without indexes, MongoDB performs full collection scans.

### Common Types of Indexes in MongoDB

- **Single Field Index**: The most basic form of index.
- **Compound Index**: Generated across multiple fields; used for queries involving these fields.
- **Multikey Index**: Specially designed for arrays or embedded documents.

Batch Insert Operations on an Indexed Collection
Describe any performance bottlenecks you anticipate.

- **Text Index**: Suited for text searches, often leveraging stemming and stop words.

Unique
Explain in which situations it's beneficial to manage a unique index.
Discard icon
GEO Index
Describe the purpose of this index type and the type of queries it can optimize.

- **TTL (Time-to-Live) Index**: Deletes documents after a specified duration, suitable for logs and cached data.

### Common Performance Bottlenecks with Indexes

- **Index Overuse**: Too many indexes can degrade write performance.
- **Index Size**: Larger indexes consume more RAM and might slow down read and write operations.

- **Index Inefficiency**: Inaccurate or non-selective index usage can render them ineffective.

- **Write Penalties**: Indexes incur an overhead during writes, impacting their efficiency in write-heavy systems.

- **Index Maintenance**: Regular maintenance, like rebuilding or reorganizing indexes, is often necessary.

- **Workload Misalignment**: An index might not be beneficial if it's not aligned with the actual query workload.

Make sure to keep the indexes required and remove any unnecessary ones.
<br>

## 10. What is the role of the _id field_ in _MongoDB documents_?

The `_id` Field in MongoDB serves as a **primary key** and provides several key functionalities:

- **Uniqueness Guarantee**: Each document must have a unique `_id`, which ensures data integrity.
- **Automatic Indexing**: Automated indexing based on `_id` enhances query efficiency.

- **Inherent Timestamp**: The `_id` can have an embedded timestamp, useful for time-based operations.

  For instance, with an **ObjectId**, the first 8 characters represent a 4 byte timestamp:

  $\text{timestamp} = \text{substr}(\text{ObjectId}, 0, 8)$

- **Concurrency Control**: If multiple write operations with the same `_id` occur simultaneously, MongoDB uses a technique called **last-write wins** to manage the conflict:

  The document with the most recent `_id` value, or timestamp if using an ObjectId, supersedes the others.

- **_Modify and Return_**: When executing an operation to insert a new document or find & modify an existing one, you can request to return the modified document and its `_id`.

### ObjectId vs. Custom `_id`

While MongoDB provides **automatic ObjectId** generation, documents can also use custom values.

- **Custom Representations**: Unleash flexibility by using custom strings, numbers, or other valid BSON types for the `_id` field.

- **Controlled Uniformity**: Design your own `_id` strategy to align with data, such as employing natural keys for documents originating from specific, external sources.

- **Migrate with Care**: Once an application is live, altering the structure can be intricate. Transition plans are vital for a seamless shift.

- **Custom Indexing**: Managing an index on a uniquely generated custom `_id` turns the data into a compact, high-throughput structure.

### Schema Design and the `_id` Field

The choice between automatic ObjectId and custom `_id` values links back to the **intended data model, data access patterns**, and specific **domain requirements**.

While using the automatic ObjectId brings about benefits like **ease of use** and **embedded timestamp**, custom `_id` generation provides finer control and helps in scenarios where a specific data structure is favored or where external data sources need to be integrated.
<br>

## 11. How do you create a new _MongoDB collection_?

The process for creating a new collection in MongoDB is simple and instantaneous.

### Benefits of Instantaneous Creation

- MongoDB collections are schemaless, leading to immediate collection creation.
- Document structure and content drive schema design.
- No predefined schema requirements allow for dynamic, evolving data models.

### Steps to Create a Collection

1. **Select the Database:** Ensure you are connected to the intended database for the collection's creation. Switch to the desired database using `use` in the `mongo` shell or select the database programmatically in your driver's API.

2. **Perform a Write Operation:** The new collection is created the moment you execute a write operation such as `insert`, `update`, or `save`.

3. **Check Collection Existence (Optional):** While not necessary for the creation process, you can verify the collection is created using the listCollections method.
   <br>

## 12. What is the syntax to insert a _document_ into a _MongoDB collection_?

To **insert a document** into a **MongoDB collection**, you can use the **`insertOne()`** method, which accepts the document as an argument:

```javascript
db.collectionName.insertOne({
	key1: "value1",
	key2: 2,
	key3: [1, 2, 3],
	key4: { nestedKey: "nestedValue" },
});
```

Alternatively, you can use the **`insertOne()`** method, supply an array of documents with **`insertMany()`**:

```javascript
db.collectionName.insertMany([{ key: "value1" }, { key: "value2" }]);
```

<br>

## 13. Describe how to read data from a _MongoDB collection_.

To **read** data from a **MongoDB collection**, you use the `find` method with various options for querying and data manipulation.

### Key Methods

- **find**(filter, projection): Retrieves documents based on filter conditions. You can specify which fields to include or exclude in the result (**projection**).
- **findOne**(filter, projection): Similar to `find` but retrieves only the first matching document.
- **distinct**(field, filter): Returns a list of distinct values for a specific field, optionally filtered.

### Query Operators

- **Comparison**: `$eq`, `$gt`, `$lt`, `$in`, `$nin`, etc.
- **Logical**: `$and`, `$or`, `$not`, `$nor`, etc.
- **Element**: `$exists`, `$type`
- **Evaluation**: `$regex`, `$mod`, `$text`
- **Geospatial**: `$geoNear`, `$geoWithin`, etc.

### Aggregation

MongoDB also provides the **aggregation framework** for complex operations, using a pipeline of various stages like `match`, `group`, `sort`, `limit`, etc.

### Example: Basic Find Query

Here is a Javascript code:

```Javascript
const mongoose = require('mongoose');

# Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

# Assign the database and collection to variables
const myDatabase = db.db('mydatabase');
const myCollection = myDatabase.collection('mycollection');

# Retrieve all documents
const allDocumentsCursor = myCollection.find();

# Convert cursor to array and log the documents
allDocumentsCursor.toArray()
    .then(allDocumentsArray => {
        console.log('All documents:');
        allDocumentsArray.forEach(doc => console.log(doc));
    })
    .catch(err => console.error('Error retrieving documents:', err));

# Close the connection when done
db.close();

```

### Example: Querying with Filters

Here is a Javascript code:

```Javascript
# Let's say we have the following documents in the collection:
# [{
#    "name": "John",
#    "age": 30,
#    "country": "USA"
#  },
#  {
#    "name": "Jane",
#    "age": 25,
#    "country": "Canada"
# }]

# Retrieve documents where the name is "John"
myCollection.findOne({ "name": "John" })
    .then(johnDoc => {
        console.log('John\'s document:', johnDoc);
    })
    .catch(err => console.error('Error retrieving John\'s document:', err));

# Retrieve documents where age is greater than or equal to 25 and from country "USA"
const filterCriteria = { "age": { "$gte": 25 }, "country": "USA" };
myCollection.find(filterCriteria)
    .toArray()
    .then(docsMatchingCriteria => {
        console.log('Documents matching criteria:');
        docsMatchingCriteria.forEach(doc => console.log(doc));
    })
    .catch(err => console.error('Error retrieving documents matching criteria:', err));
    # Output: {"name": "John", "age": 30, "country": "USA"}
```

### Projection

**Projection** helps control the fields returned. It uses a dictionary where fields to include are marked with 1, and those to exclude with 0.

For instance, `{"name": 1, "age": 1, "_id": 0}` only includes `name` and `age` while excluding `_id`:

Here is a Javascript code:

```Javascript
const myDatabase = db.db('mydatabase');
const myCollection = myDatabase.collection('mycollection');
# Retrieve the name and age fields, ignoring the _id field
# Assign the database and collection to variables

# Retrieve documents with limited fields
const docsWithLimitedFieldsCursor = myCollection.find({}, { "name": 1, "age": 1, "_id": 0 });

# Convert cursor to array and log the documents
docsWithLimitedFieldsCursor.toArray()
    .then(docsWithLimitedFieldsArray => {
        console.log('Documents with limited fields:');
        docsWithLimitedFieldsArray.forEach(doc => console.log(doc));
    })
    .catch(err => console.error('Error retrieving documents with limited fields:', err));

    # Output: {"name": "John", "age": 30}
    #         {"name": "Jane", "age": 25}
```

### Sort, Skip, and Limit

**`sort`**, **`skip`**, and **`limit`** help in reordering, pagination, and limiting the result size.

Here is a Javascript code:

```Javascript
# Sort all documents by age in descending order
const documentsSortedByAge = myCollection.find().sort({ "age": -1 });

# Skip the first two documents and retrieve the rest
const documentsAfterSkipping = myCollection.find().skip(2);

# Limit the number of documents returned to 3
const limitedDocuments = myCollection.find().limit(3);

# Convert cursors to arrays and log the documents
Promise.all([
    documentsSortedByAge.toArray(),
    documentsAfterSkipping.toArray(),
    limitedDocuments.toArray()
]).then(([sortedByAgeArray, afterSkippingArray, limitedArray]) => {
        console.log('Documents sorted by age:');
        sortedByAgeArray.forEach(doc => console.log(doc));

        console.log('\nDocuments after skipping:');
        afterSkippingArray.forEach(doc => console.log(doc));

        console.log('\nLimited documents:');
        limitedArray.forEach(doc => console.log(doc));
    })
    .catch(err => console.error('Error retrieving documents:', err));
```

### Distinct Values

Here is a Javascript code:

```Javascript
# Assign the collection to a variable
const myCollection = db.db('mydatabase').collection('mycollection');

# Get a list of distinct countries
myCollection.distinct("country")
    .then(distinctCountries => {
        console.log('Distinct countries:', distinctCountries);
    })
    .catch(err => console.error('Error getting distinct countries:', err));
```

### Indexes

Indexes improve read performance. Ensure to use appropriate indexes for frequent and complex queries to speed up data retrieval. If the queries differ from the indexing pattern or if the collection is small, the gain from indexing might be insignificant, or it could even affect the write performance of the database. Choose an indexing strategy based on your data and usage patterns.

For example, if you frequently query documents based on their "country" field, consider creating an index on that field:

Here is a Javascript, Mongoose code:

````Javascript
myCollection.createIndex({ "country": 1 })
    .then(indexName => {
        console.log(`Index created on field "country": ${indexName}`);
    })
    .catch(err => console.error('Error creating index:', err));```

This would make lookups based on the "country" field more efficient.
<br>

## 14. Explain how to update _documents_ in _MongoDB_.

**MongoDB** offers several ways to update documents (equivalent to SQL's "rows"). Let’s look at the most common methods.

### Update Methods

- **Replace**: Entire document is updated. This is the closest equivalence to SQL's `UPDATE` statement.
- **Update**: For selective field updates, you use `$set`, `$inc`, `$push`, `$unset`, and more. This resembles SQL's `UPDATE` with selective column updates.

### Replace & Update in _MongoDB_

#### Top-Down Approach Using Replace

- **Method**: `db.collectionName.updateOne()`
- **Code**:

  ```javascript
  db.collectionName.updateOne({ name: "John Doe" }, { $set: { age: 30 } });
````

- **Use-Case**: When replacing an entire document isn't needed. For example, when changing a user's email address.

#### Bottom-Up Approach Using Update + $set

- **Method**: `db.collectionName.replaceOne()`
- **Code**:

  ```javascript
  db.collectionName.replaceOne(
  	{ name: "John Doe" },
  	{ name: "John Doe", age: 30 }
  );
  ```

- **Use-Case**: When an entire document needs updating or replacing, such as a product detail or a user’s information.
  <br>

## 15. What are the _MongoDB commands_ for deleting _documents_?

MongoDB offers several methods for deleting documents.

### Deletion Methods in MongoDB

1. **deleteOne()**: Deletes the first matched document.

2. **deleteMany()**: Removes all matching documents.

3. **remove()**: Legacy function; use `deleteOne()` or `deleteMany()` instead.

### General Syntax

- For `deleteOne()`, the syntax is:
  - **db.collection.deleteOne({filter}, {options})**
- For `deleteMany()`, the syntax is:
  - **db.collection.deleteMany({filter}, {options})**

### Code Example: Deleting One or Many

Here is the MongoDB shell script:

```javascript
// Connect to the database
use myDB;

// Delete a single document from 'myCollection'
db.myCollection.deleteOne({ name: "Document1" });

// Delete all documents from 'myCollection' with the condition 'age' greater than 25
db.myCollection.deleteMany({ age: { $gt: 25 } });
```

<br>
<h1>Populate</h1>

**Few important notes:**
- *Models* are defined using *Schemas*
- Instance of a model is called *document*

You can use **populate()** method to refer to the other documents.

The below examples shows **one to many relation** between *authors* and *books*: 

```typescript
import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Book'
  }]
})

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, 
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author'
  }
})

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);
```
Here, the ref option tells Mongoose which model to use during population. 

#### Note: 
```ObjectId, String, Number, Buffer``` all are valid types for refs. However, you should use ObjectUd unless you want to use it for advanced queries.

<h2>Populating</h2>

```typescript
const book = await Book.findOne({ name: 'Harry Potter' }).populate('author');
console.log(book.author) // returns author object
```
Similarly,
```typescript
const author = await Author.findOne({ name: 'John Doe' }); 
console.log(author.books) // returns an array of book IDs 
const authorWithBooks = await Author.findOne({ name: 'John Doe' }).populate('books');
console.log(author.books) // returns an array of book objects
```
<h2>Field Selection</h2>

What if we only want to populate other document's specific fields? 
We can do that by passing in **field name** as a second argument to the populate method.
```typescript
const author = await Author.findOne({ name: 'John Doe' }); 
console.log(author.books) // returns an array of book IDs 
const authorWithBooks = await Author.findOne({ name: 'John Doe' }).populate('books', 'name')
console.log(author.books) // returns an array of book objects with their names
```
<h2>Advance Queries</h2>

What if we want to query books by an Author "John Doe" and **only** populate **names and no ID who's price is less than 10**?

```typescript
const author = await Author.findOne({ name: "John Doe" })
                    .populate({
                      path: 'books',
                      match: {price: { $gte: 10 }},
                      select: 'name -_id'
                    })
```

More details : https://mongoosejs.com/docs/populate.html#populate_multiple_documents

<br>

# AGGREGATION

Aggregation basically groups the data from multiple documents and operates in many ways on those grouped data in order to return one combined result.

Unlike Refs/Populate, aggregation runs the query on the server side (mongodb) and returns the processed documents.

It works with STAGES:

`STAGE1` == (altered_data) ==> `STAGE2` == (altered_data) ==> `STAGE3
previous stages's result is input for next stage 

A stage can appear multiple times in a pipeline, with the exception of $out, $merge, and $geoNear stages. In this article, we will discuss in brief the seven major stages that you will come across frequently when aggregating documents in MongoDB. For a list of all available stages, see Aggregation Pipeline Stages.

## $project
Reshapes each document in the stream, e.g., by adding new fields or removing existing fields. For each input document, output one document.
## $match
Filters the document stream to allow only matching documents to pass unmodified into the next pipeline stage. For each input document, the output is either one document (a match) or zero document (no match).
## $group
Groups input documents by a specified identifier expression and apply the accumulator expression(s), if specified, to each group. $group consumes all input documents and outputs one document per each distinct group. The output documents only contain the identifier field (group id) and, if specified, accumulated fields.
## $sort:
Reorders the document stream by a specified sort key. The documents are unmodified, except for the order of the documents. For each input document, the output will be one document.
## $skip
Skips the first n documents where n is the specified skip number and passes the remaining documents unmodified to the pipeline. For each input document, the output is either zero document (for the first n documents) or one document (after the first n documents).
## $limit
Passes the first n documents unmodified to the pipeline where n is the specified limit. For each input document, the output is either one document (for the first n documents) or zero document (after the first n documents).
## $unwind
Breaks an array field from the input documents and outputs one document for each element. Each output document will have the same field, but the array field is replaced by an element value per document. For each input document, outputs n documents where n is the number of array elements and can be zero for an empty array.

`

Also, _it works perfectly with indexes similar to how "find works"_.

DATASET:

```js
{
        "_id" : ObjectId("603a87095854104ef6c863e1"),
        "gender" : "male",
        "name" : {
                "title" : "mr",
                "first" : "zachary",
                "last" : "lo"
        },
        "location" : {
                "street" : "3193 king st",
                "city" : "chipman",
                "state" : "yukon",
                "postcode" : "H8N 1Q8",
                "coordinates" : {
                        "latitude" : "76.4507",
                        "longitude" : "-70.2264"
                },
                "timezone" : {
                        "offset" : "+11:00",
                        "description" : "Magadan, Solomon Islands, New Caledonia"
                }
        },
        "email" : "zachary.lo@example.com",
        "login" : {
                "uuid" : "76970c67-4801-4926-80f0-4872fe0aee42",
                "username" : "lazyrabbit189",
                "password" : "pass1",
                "salt" : "BVMLMPwZ",
                "md5" : "a6ff61f912af9958587e0fc0c8dc920b",
                "sha1" : "bd37d1c699fb5a17031924c37e5d90ba4403e598",
                "sha256" : "0305e3ebf6f4502790d804cff5989a6a928f466af6e36bd808ad9ed24e51fee7"
        },
        "dob" : {
                "date" : "1988-10-17T03:45:04Z",
                "age" : 29
        },
        "registered" : {
                "date" : "2011-09-29T20:54:32Z",
                "age" : 6
        },
        "phone" : "273-427-0510",
        "cell" : "309-911-7770",
        "id" : {
                "name" : "",
                "value" : null
        },
        "picture" : {
                "large" : "https://randomuser.me/api/portraits/men/9.jpg",
                "medium" : "https://randomuser.me/api/portraits/med/men/9.jpg",
                "thumbnail" : "https://randomuser.me/api/portraits/thumb/men/9.jpg"
        },
        "nat" : "CA"
}
```

Query:

```js
// takes in an array (pipeline)
db.contacts.aggregate([
  // $match === exactly same as find
  { $match: { gender: 'female' } },
]);
```

Here $match is a stage (of a pipeline which decide the returning docs). We can add multiple stages.

Let us now try and

**QUESTION**
Find a custom collection that tells us how many people are living in all the states with the state names.

```js
db.contacts.aggregate([
  { $match: { gender: 'female' } }, // stage1
  {
    $group: {
      // accumulates data
      // stage2
      _id: { stateName: '$location.state' }, // _id is a syntax here
      totalPeople: { $sum: 1 }, // aggregation functions (applied on all the returned docs (eg: $sum) )
    },
  },
]);
```

Retreived Data:

```js
{ "_id" : { "stateName" : "hautes-alpes" }, "totalPeople" : 2 }
{ "_id" : { "stateName" : "paris" }, "totalPeople" : 1 }
{ "_id" : { "stateName" : "bremen" }, "totalPeople" : 11 }
{ "_id" : { "stateName" : "oregon" }, "totalPeople" : 7 }
{ "_id" : { "stateName" : "åland" }, "totalPeople" : 10 }
{ "_id" : { "stateName" : "antalya" }, "totalPeople" : 1 }
{ "_id" : { "stateName" : "brandenburg" }, "totalPeople" : 12 }
{ "_id" : { "stateName" : "kastamonu" }, "totalPeople" : 1 }
{ "_id" : { "stateName" : "eskişehir" }, "totalPeople" : 3 }
{ "_id" : { "stateName" : "dorset" }, "totalPeople" : 1 }
{ "_id" : { "stateName" : "mecklenburg-vorpommern" }, "totalPeople" : 11 }
{ "_id" : { "stateName" : "cumbria" }, "totalPeople" : 2 }
{ "_id" : { "stateName" : "melilla" }, "totalPeople" : 5 }
{ "_id" : { "stateName" : "قم" }, "totalPeople" : 4 }
{ "_id" : { "stateName" : "uşak" }, "totalPeople" : 1 }
{ "_id" : { "stateName" : "burdur" }, "totalPeople" : 2 }
{ "_id" : { "stateName" : "gelderland" }, "totalPeople" : 16 }
{ "_id" : { "stateName" : "arizona" }, "totalPeople" : 4 }
{ "_id" : { "stateName" : "dordogne" }, "totalPeople" : 1 }
{ "_id" : { "stateName" : "bingöl" }, "totalPeople" : 2 }
```

Let us try and sorting the above result:

```js
db.contacts.aggregate([
  { $match: { gender: 'female' } }, // stage1
  { $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } } }, // stage2
  { $sort: { totalPersons: -1 } }, // stage3
]);
```

<hr />

## Project stage

Helps us transform the returning documents:

**QUESTION**

Let us say we want to:

- Get all the docs with age > 20
- I don't want IDS to show
- I only want their genders to show
- I want a new field "fullName" with their first and last names concatinated

```js
db.contacts.aggregate([
  { $match: { 'dob.age': { $gt: 20 } } },
  { $project: { _id: 0, gender: 1, fullName: { $concat: ['$name.first', ' ', '$name.last'] } } },
]);
```

```javascript
db.contacts.aggregate([
        {$match: {'dob.age': {$gt: 20}}},
        {$project: {
            _id: 0,
            gender: 1,
            fullName: {
                $concat: [
                        { $toUpper: { "$name.first" } },
                        " ",
                        { $toUpper: { "$name.last" } }
                ]
           ` }
        }}
]);
```

Let us say, we want only the first alphabets to be in the uppercase.

```js
db.contacts.aggregate([
  { $match: { 'dob.age': { $gt: 20 } } },
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1, // start cutting from first index
              { $subtract: [{ $strLenCP: '$name.first' }, 1] }, // until length -1
            ],
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          { $substrCP: ['$name.last', 1, { $subtract: [{ $strLenCP: '$name.first' }, 1] }] },
        ],
      },
    },
  },
]);
```

## Multi stage PROJECT

```js
db.contacts.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1, // make sure you inherit fields at every stage to show them
      location: {
        random: 'field',
        coordinates: ['$location.coordinates.longitude', '$location.coordinates.latitude'],
      },
    },
  },
  {
    $project: {
      location: 1,
      email: 1, // make sure you iherit field
      fullName: {
        $concat: ['$name.first', ' ', '$name.last'],
      },
    },
  },
]);
```

Returned documents:

```js
[
  {
    location: { random: 'field', coordinates: ['101.5995', '78.8545'] },
    email: 'isolino.viana@example.com',
    fullName: 'isolino viana',
  },
  {
    location: { random: 'field', coordinates: ['-18.5996', '-42.6128'] },
    email: 'elijah.lewis@example.com',
    fullName: 'elijah lewis',
  },
];
```

Same example as above, but this time we want the coordinates to be in integers:

```js
db.contacts.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      location: {
        random: 'field',
        coordinates: [
          {
            $convert: {
              input: '$location.coordinates.longitude',
              to: 'double',
              onError: 0.0, // in case some error occurs, return as 0.0
              onNull: 0, // in case its null, return 0.0
            },
          },
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0.0,
              onNull: 0,
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      location: 1,
      fullName: {
        $concat: ['$name.first', ' ', '$name.last'],
      },
    },
  },
]);
```

<hr />

**question**:

I want the collection of all the users who's age is greater than 25 and print their names and their _dob.date_ to _generic date type_.

```js
db.contacts.aggregate([
  {
    $match: { 'dob.age': { $gt: 25 } },
  },
  {
    $project: {
      _id: 0,
      name: {
        $concat: ['$name.first', ' ', '$name.last'],
      },
      birthdate: {
        $convert: {
          input: '$dob.date',
          to: 'date', // predefined mongo date type
          onError: 0.0,
          onNull: 0,
        },
      },
    },
  },
]);
```

**Result**

```js
{ "name" : "zachary lo", "birthdate" : ISODate("1988-10-17T03:45:04Z") }
{ "name" : "louise graham", "birthdate" : ISODate("1971-01-21T20:36:16Z") }
{ "name" : "harvey chambers", "birthdate" : ISODate("1988-05-27T00:14:03Z") }
{ "name" : "victor pedersen", "birthdate" : ISODate("1959-02-19T23:56:23Z") }
```

**SHORTCUT**:

```js
db.contacts.aggregate([
  {
    $match: { 'dob.age': { $gt: 25 } },
  },
  {
    $project: {
      _id: 0,
      name: {
        $concat: ['$name.first', ' ', '$name.last'],
      },
      birthdate: { $toDate: '$dob.date' }, // toDate is another aggregate operator
    },
  },
]);
```


## DATASET (ADVANCE)

```js
[
  {
    "projectName": "first",
    "resources": [
      {
        "resource": "EC2",
        "region": "ap-south-1",
        "params": {
          "ImageId": "ami-0bcf5425cdc1d8a85",
          "InstanceType": "t2.micro"
        }
      },
      {
        "resource": "S3",
        "region": "ap-south-1",
        "params": {
          "Bucket": "test-bucket"
        }
      }
    ]
  }
]
```
 I want to find out the documents who's resources array have 'EC2' and print out ONLY that element from the array.
 
 __Solution__
 
 ```js
 const resources = await Project.aggregate([
      {
        $match: {
          resources: {
            $elemMatch: {
              resource: { $eq: resourceType },
            },
          },
        },
      },
      {
        $project: {
          projectName: '$projectName',
          createdAt: '$createdAt',
          resources: {
            $filter: {
              input: '$resources',
              as: 'each', // use $$ to refer
              cond: { $eq: ['$$each.resource', 'EC2'] },
            },
          },
        },
      },
    ]);
 ```


OR 

- $filter to iterate loop of resources array and find matching resource

- $arrayElemAt to get first matching element from above filtered result

- $replaceRoot to replace above return object to root

```js
const projects = await Project.aggregate([

  { $match: { resources: { $elemMatch: { resource: { $eq: "EC2" } } } } },
  // or below match is equal to above match condition
  // { $match: { "resources.resource": "EC2" } },

  {
    $replaceRoot: {
      newRoot: {
        $arrayElemAt: [
          {
            $filter: {
              input: "$resources",
              cond: { $eq: ["$$this.resource", "EC2"] }
            }
          },
          0
        ]
      }
    }
  }
])
```

<br>


# MORE ABOUT OPERATORS

## $lt or $gt

#### To find all the movies who's length is less than 60 mins:

```js
db.movies.find({ runtime: { $lt: 60 } });
```

#### To find all the movies who's rating is greater than 8.5

```js
db.movies.find({ 'rating.average': { $gt: 8.5 } });
```

## $elemMatch

#### To find all movies who's genres contain 'adventure'

```js
db.movies.find({
  'details.genres': {
    $elemMatch: {
      $eq: 'adventure',
    },
  },
});

// OR

db.movies.find({
  'details.genres': 'adventure',
});
```

Find the users who's hobbies have title "Sports" _and_ that same field has frequency: _gte 3_

**NOTE** : _You can use $and BUT that will not query on the same field_

```js
db.users.find({
  hobbies: {
    $elemMatch: { $and: [{ title: 'Sports' }, { frequency: { $gte: 3 } }] },
  },
});
```

## $in or $nin

#### To find movies who's runtime is either 60 or 90

```js
db.movies.find({
  runtime: {
    $in: [60, 90],
  },
});
```

## To find movies who's runtime is neither 60 or 90

```js
db.movies.find({
  runtime: {
    $nin: [60, 90],
  },
});
```

# LOGICAL OPERATORS

## $or and $nor

#### To find movies who's genres contains comedy OR whos rating is less than 8.5

```js
db.movies.find({
  $or: [{ 'details.genres': 'comedy' }, { 'rating.average': { $lt: 8.5 } }],
});
```

You can also use _$nor, $and or $nand_.

# ELEMENT OPERATORS

## $exist or $type

#### To find movies for which field runtime exists

```js
db.movies.find({
  runtime: { $exists: true },
});
```

# EVALUATE OPERATORS

## $regex or $expr

#### To find movies for which the genres consists "act"

```js
// option === i is for ignore case
db.movies.find({ 'details.genres': { $regex: 'act', $option: 'i' } });
```

#### To find the movies list who's dislikes are more than rating

_$expr is used to compare two fields within the document and while it is used, it is written first unlike other operators_

```js
db.movies.find({ $expr: { $gt: ['$rating.dislikes', 'rating.average'] } });
```

<br>


# Indexing

```js
{
        "_id" : ObjectId("603a87095854104ef6c86425"),
        "gender" : "female",
        "name" : {
                "title" : "ms",
                "first" : "kelya",
                "last" : "philippe"
        },
        "location" : {
                "street" : "3688 quai chauveau",
                "city" : "avignon",
                "state" : "aisne",
                "postcode" : 47002,
                "coordinates" : {
                        "latitude" : "2.4082",
                        "longitude" : "153.9632"
                },
                "timezone" : {
                        "offset" : "+4:00",
                        "description" : "Abu Dhabi, Muscat, Baku, Tbilisi"
                }
        },
        "dob" : {
                "date" : "1950-08-05T15:04:26Z",
                "age" : 68
        }
}
```

**To check the speed of your search query analysis**:

```js
db.contacts.explain('executionStats').find({ 'dob.age': { $gt: 60 } });
```

## Creating index

Let us say we need to create an index on **age**

```js
/*
 *  1    ==    ascending ordered index
 * -1    ==    descending ordered index
 *  The speed doesn't depend on the sort much
 *  because mongo can find the document from either direction
 */
db.contacts.createIndex({ 'dob.age': 1 });
```

### EXPLAINATION :

Index scans (index stage) does not return the documents. They return the pointers to the documents.
Later on, the _fetch stage_ reach out to the actual document using that pointer.

### CAVIAT

Let us say we want all the users with the ages greater than 10:

```js
// assuming indexing is still there
db.contacts.find({ 'dob.age': { $gt: 10 } });
```

_This execution will actually be slower than the one WITHOUT INDEXING_.

_WHY IS THAT?_

This is because `age > 10` covers 90% of the documents inside of the database.
So our database had to cover 90% of the indexes and returns all the pointers = pointing to their respective databases. And further, it took time to fetch those documents for us, so it actually was slow.

The point is, you should not be using indexes for the queries which return a gigantic number of documents.
_Rather, use indexes for fields which are usually unique and return less amount of documents_

## Deleting index

To delete the index:

```js
db.contacts.dropIndex({ 'dob.age': 1 });
```

_\_id field has a default indexed_

## Getting indexes

To find all the existing indexes on a collection:

```js
db.contacts.getIndexes();
```

## Creating Unique Index

Mongo has \_id as default index since it is unique. Let us say we have collection of users who's email IDs are ALWAYS unique **AND** you want to query user using email field **frequently**, then you can create a new unique index like:

```js
db.users.createIndex({ email: 1 }, { unique: true });
```

## Creating COMPOUND INDEXES

This is used to create indexes using two fields in your collection:

```js
// can be used together or from left -> right (see examples)
db.users.createIndex({ 'dob.age': 1, gender: 1 });
```

This would create an index field something like: `33 male`.

### Examples

Query1 (good query for indexes):

```js
// order does not matter (can be different from that of index)
db.users.find({ 'dob.age': 35, gender: 'male' });
```

Query2 (also fine `left to right`):

```js
// this will also use same index
db.users.find({ 'dob.age': 35 });
```

Query3 (WRONG this won't use index)

```js
// query is right but it won't make use of index
// if you move left to right, you have to include the left ones
db.users.find({ gender: 'male' });
```

## Sorting using Indexes

In case you need large amount of data to be sorted using a specific field in the document on a regular basis, you should use indexing for that partifcular field because it helps the response time by ALOT as the db wouldn't have to sort the returned data for you. This is because indexes are already sorted.

## PARTIAL FILTERS

Let us say you create indexes on age BUT you use the age query only for the gener male everytime in the users collection.

So, there is no point of making index on the whole collection. This is what you would do:

```js
db.users.createIndex({ 'age.dob': 1 }, { partialFilterExpression: { gender: 'male' } });
```

You could also do something like :

```js
db.users.createIndex(
  { 'age.dob': 1 },
  { partialFilterExpression: { 'hobbies.frequency': { $gt: 6 } } } // where
);
```

**NOTE:** : _to use this index, you will have to include exact indexes while querying. This won't work like compound indexes(left -> right). This is because, if mongo does that, since the indexes are partial, you might end up skipping returned data. HMMMMM....? Here, what if the the qeury satisfies the documents on which there is no indexing?_

Further explaination:

Let us consider the partial indexing:

```js
db.users.createIndex({ 'dob.age': 1 }, { partialFilterExpression: { gender: 'male' } });
```

This create indexes ONLY FOR MALES:

Now if you query for people older than 60:

```js
db.users.find({ 'dob.age': 60 });
```

This^^ will NOT run IndexScan, BECAUSE what if we have users who are women and are > 60 age? And if we were to use index for scanning, it would have skipped those documents.

_Therefore, mongo will run a collection scan_

**The best way to use this index would be:**

```js
db.users.find({ 'db.age': 60, gender: 'male' });
```

## TEXT INDEXES (usually used for search functionality)

Dataset:

```js
{
        title: "Book1",
        description: "This is an awesome book and is a must buy"
}
```

Command:

```js
// use the word 'text' instead of 1/-1
db.products.createIndex({ description: 'text' });
```

The collection must have ONLY ONE TEXT INDEX since it is very expensive.

This will create an ARRAY of index with the words `awesome`, `book`, `must`, `buy` etc and ignore the rest of the generic words for us.

**Search Query**

```js
db.products.find({ $text: { $search: 'awesome' } });
```

```js
// this will return all the documents with the words 'awesome' and 'book'
db.products.find({ $text: { $search: 'awesome book' } });
```

Let us say we want documents with specificly `awesome book` as a single word:

```js
db.products.find({ $text: { $search: '"awesome book"' } });
```

This will only return if the description has "awesome book" as a phrase.

### SORT TEXT INDEXES RESULTS BASED ON EXACT MATCH (SCORE)

Dataset:

```js
[
  {
    title: 'Red T-Shirt',
    description: 'This T-shirt is read and is awesome',
  },
  {
    title: 'A Book',
    description: 'This is an awesome book about a young artist',
  },
];
```

Let us search for "awesome t-shirt" (_which will return both the docs as they both have either of the words_).
But I want it to sort it based on the **most accurate match**.

_SOLUTION_

```js
db.products.find(
  { $text: { $search: ' awesome book ' } },
  { score: { $meta: 'textScore' } } // this sorts it
);
```

We can further change the order of sorting:

```js
db.products
  .find({ $text: { $search: 'awesome book' } }, { score: { $meta: 'textScore' } })
  .sort({ score: -1 }); // here
```

<br>


#### Credit to 👉 [Devinterview.io and karankumarshreds)

<br>

