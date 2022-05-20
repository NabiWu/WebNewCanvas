-- get announcement for a student
-- select courses.name as courseName, title, content, anns.created_at as created_at
-- from announcements as anns join courses on anns.course_id=courses.id
-- where anns.course_id in (
--         select course_id
--         from users
--             join takes on users.id = takes.student_id
--         where users.id = 6
-- )

-- get assignments of a course
-- select courses.name as courseName, title, content, anns.created_at as created_at
-- from announcements as anns join courses on anns.course_id=courses.id
-- where anns.course_id in (
--         select course_id
--         from users
--             join takes on users.id = takes.student_id
--         where users.id = 6
-- )


-- select courses.id, courses.name from takes join courses on takes.course_id=courses.id where takes.student_id = 6


-- get grades of an assignment
INSERT into assignments()

select * from submissions;
-- INSERT INTO submissions (student_id, course_id, assignment_id)