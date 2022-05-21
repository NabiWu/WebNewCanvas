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



select users.id as student_id, users.name as student_name, assignments.title, submissions.grade from assignments join takes on assignments.course_id=takes.course_id
join users on takes.student_id=users.id 
left JOIN submissions on submissions.student_id=takes.student_id
where assignments.id=1