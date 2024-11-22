# Common Mongo Shell Commands

Here are some common commands used in the MongoDB shell:
main (show, use, db, cls, it to iterate through collection)

1. **Connecting to MongoDB**
    ```sh
    mongo
    ```

2. **Show Databases**
    ```sh
    show dbs
    ```

3. **Switch to a Database**
    ```sh
    use <database_name>
    ```

4. **Show Collections**
    ```sh
    show collections
    ```

5. **Insert a Document**
    ```js
    db.<collection_name>.insert({ <field>: <value> })
    ```

6. **Find All Documents in a Collection**
    ```js
    db.<collection_name>.find()
    ```
    actually it return a cursor (an object that points to document)

7. **Find a Specific Document**
    ```js
    db.<collection_name>.find({ <field>: <value> })
    ```

8. **Update a Document**
    ```js
    db.<collection_name>.update(
         { <field>: <value> },
         { $set: { <field>: <new_value> } }
    )
    ```

9. **Remove a Document**
    ```js
    db.<collection_name>.remove({ <field>: <value> })
    ```

10. **Count Documents in a Collection**
     ```js
     db.<collection_name>.count()
     ```

11. **Create an Index**
     ```js
     db.<collection_name>.createIndex({ <field>: 1 })
     ```

12. **Drop a Collection**
     ```js
     db.<collection_name>.drop()
     ```

13. **Drop a Database**
     ```js
     db.dropDatabase()
     ```

14. **Sort Documents in a Collection**
     ```js
     db.<collection_name>.find().sort({ <field>: 1 })
     ```
15. **Count Documents in a Collection**
    ```js
    db.<collection_name>.countDocuments()
    ```
16. **Paginate Through Documents**
    ```js
    db.<collection_name>
        .find()
        .skip(<number_of_documents_to_skip>)
        .limit(<number_of_documents_to_return>)
    ```

These commands should help you get started with basic operations in the MongoDB shell.


## What is an Index?

An index in MongoDB is a special data structure that improves the speed of data retrieval operations on a collection. Indexes are created on fields in documents. Without indexes, MongoDB must perform a collection scan, i.e., scan every document in a collection, to select those documents that match the query statement.

## Drawbacks of index

1. **Increased Storage Space:** Indexes require additional storage space. The more indexes you create, the more disk space is consumed.

2. **Slower Write Operations:** Every time a document is inserted, updated, or deleted, the indexes must also be updated. This can slow down write operations.

3. **Memory Usage:** Indexes consume memory. If the indexes are too large to fit in RAM, MongoDB will need to read from disk, which can slow down query performance.

4. **Complexity in Index Management:** Managing multiple indexes can become complex, especially as the database schema evolves. Deciding which indexes to create and maintain requires careful planning and monitoring.

5. **Potential for Over-Indexing:** Creating too many indexes can lead to diminishing returns. Each index adds overhead, and not all indexes may be used frequently enough to justify their cost.

## Handle index
### How to Create an Index

To create an index on a field, use the `createIndex` method. For example, to create an index on the `name` field in the `users` collection:

```js
db.users.createIndex({ name: 1 })
```

The `1` specifies an ascending index. Use `-1` for a descending index.

### Using Indexes

Once an index is created, MongoDB will use it to optimize query performance. For example, if you have an index on the `name` field, the following query will be faster:

```js
db.users.find({ name: "John" })
```

### Viewing Indexes

To view the indexes on a collection, use the `getIndexes` method:

```js
db.users.getIndexes()
```

### Dropping an Index

To drop an index, use the `dropIndex` method. For example, to drop the index on the `name` field:

```js
db.users.dropIndex({ name: 1 })
```

### Explaining Queries

To understand how MongoDB executes a query and how it uses indexes, you can use the `explain` method. This method provides detailed information about the query execution plan.

For example, to explain a query that searches for a user named "John":

```js
db.users.find({ name: "John" }).explain()
```

The `explain` method can also take a verbosity mode to provide different levels of detail. The modes are:

- `"queryPlanner"`: Provides information about the query plan chosen by the query optimizer.
- `"executionStats"`: Provides information about the query plan and execution statistics.
- `"allPlansExecution"`: Provides information about the query plan, execution statistics, and details of all considered plans.

For example, to get detailed execution statistics:

```js
db.users.find({ name: "John" }).explain("executionStats")
```


