# MongoDB Operators and Complex Queries

## MongoDB Operators

### Comparison Operators
- `$eq`: Matches values that are equal to a specified value.
- `$ne`: Matches all values that are not equal to a specified value.
- `$gt`: Matches values that are greater than a specified value.
- `$gte`: Matches values that are greater than or equal to a specified value.
- `$lt`: Matches values that are less than a specified value.
- `$lte`: Matches values that are less than or equal to a specified value.
- `$in`: Matches any of the values specified in an array.
- `$nin`: Matches none of the values specified in an array.

### Logical Operators
- `$and`: Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
- `$or`: Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
- `$not`: Inverts the effect of a query expression and returns documents that do not match the query expression.
- `$nor`: Joins query clauses with a logical NOR returns all documents that fail to match both clauses.

### Element Operators
- `$exists`: Matches documents that have the specified field.
- `$type`: Selects documents if a field is of the specified type.

### Array Operators
- `$all`: Matches arrays that contain all elements specified in the query.
- `$elemMatch`: Selects documents if element in the array field matches all the specified `$elemMatch` conditions.
- `$size`: Selects documents if the array field is a specified size.

## Complex Queries

### Example 1: Find documents with multiple conditions
```javascript
db.collection.find({
    $and: [
        { age: { $gte: 25 } },
        { age: { $lte: 35 } },
        { status: "A" }
    ]
})
```

### Example 2: Using `$or` to match multiple conditions
```javascript
db.collection.find({
    $or: [
        { status: "A" },
        { qty: { $lt: 30 } }
    ]
})
```

### Example 3: Combining `$and` and `$or`
```javascript
db.collection.find({
    $and: [
        { status: "A" },
        {
            $or: [
                { qty: { $lt: 30 } },
                { item: /^p/ }
            ]
        }
    ]
})
```

### Example 4: Querying arrays with `$elemMatch`
```javascript
db.collection.find({
    results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } }
})
```

### Example 5: Using `$in` and `$nin`
```javascript
db.collection.find({
    status: { $in: ["A", "D"] }
})

db.collection.find({
    status: { $nin: ["A", "D"] }
})
```

### Example 6: Checking for field existence
```javascript
db.collection.find({
    fieldName: { $exists: true }
})
```

### Example 7: Querying by data type
```javascript
db.collection.find({
    fieldName: { $type: "string" }
})
```
