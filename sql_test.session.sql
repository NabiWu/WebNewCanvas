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


-- assignments.title as assignmentName
select courses.id as courseId, assignments.id as assignmentId, courses.name as courseName,  assignments.title as assignmentName,max_points, due_date
from takes 
join assignments on takes.course_id=assignments.course_id join courses on courses.id=takes.course_id
where student_id = 3;


select users.id as studentId, users.name as studentName, grade from submissions join users on users.id=student_id
where course_id=6;
-- stu_id, stu_name, grade

select users.name, submissions.student_id, grade, submissions.answer from assignments 
left join submissions on assignments.id = submissions.assignment_id 
join users on users.id = submissions.student_id
where assignments.id = 2;


-- insert into assignments (course_id, title, description, due_date, max_points)
-- VALUES (6, 'ass3', 'description3', '6/1/2022', 100);