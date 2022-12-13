# Api endpoints

## GET /api/subject

Get all subjects

## GET /api/teacher

Get all teachers, query params: subjectId, lessonsType

## GET /api/teacher/:id

Get teacher by id

## POST /api/teacher

Create teacher, example body: { "firstName": "Alex", "secondName": "Alexy",
"surname": "Alexov", "lessonsType": "individual", "subjectId": 1,
"individualSalaryRate": 200 }

## PUT /api/teacher

Update teacher

## DELETE /api/teacher/:id

Delete teacher by id

# GET /api/lesson

Get all lessons

# POST /api/lesson

Create lesson, example body: { "startDate": "2022-12-13T19:17:20.671Z",
"teacherId": 1 }
