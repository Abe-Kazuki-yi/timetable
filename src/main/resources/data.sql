-- 生徒5人
INSERT INTO kasukabe_timetable_db.public.users (id, firstname, lastname, password, role, grade)
VALUES
('S001', '太郎', '山田', 'pass123', 'STUDENT', '中1'),
('S002', '花子', '鈴木', 'pass123', 'STUDENT', '中1'),
('S003', '次郎', '田中', 'pass123', 'STUDENT', '中2'),
('S004', '勇樹', '加藤',   'pass123', 'STUDENT', '中3'),
('S005', '沙紀', '井上',  'pass123', 'STUDENT', '中3');

-- 講師2人
INSERT INTO kasukabe_timetable_db.public.users (id, firstname, lastname, password, role, grade)
VALUES
('T001', '誠', '小林', 'pass123', 'TEACHER', 'N/A'),
('T002', '恵美', '山本', 'pass123', 'TEACHER', 'N/A');

-- 管理者1人
INSERT INTO kasukabe_timetable_db.public.users (id, firstname, lastname, password, role, grade)
VALUES
('A001', 'Admin', 'Admin', 'adminpass', 'ADMIN', 'N/A');


INSERT INTO kasukabe_timetable_db.public.lesson (id, user_id, subject, quantity, teacher_id, request, individual)
VALUES
(1, 'S001', '数学', 2, 'T001', true, false),
(2, 'S002', '英語', 1, 'T002', true, true),
(3, 'S003', '理科', 3, 'T001', false, false),
(4, 'S004', '数学', 2, 'T002', true, false),
(5, 'S005', '英語', 1, 'T001', false, true);

INSERT INTO kasukabe_timetable_db.public.availability (id, user_id, date, period, available)
VALUES
(1, 'S001', '2025-05-08', 1, true),
(2, 'S001', '2025-05-08', 2, false),
(3, 'S002', '2025-05-08', 1, true),
(4, 'S003', '2025-05-08', 2, true),
(5, 'S004', '2025-05-08', 1, false),
(6, 'S005', '2025-05-08', 3, true);

INSERT INTO kasukabe_timetable_db.public.runnable (teacher_id, subject)
VALUES
('T001', '数学'),
('T001', '英語'),
('T002', '英語'),
('T002', '理科');

INSERT INTO kasukabe_timetable_db.public.not_contact (id, filer_id, respondent_id)
VALUES
(1, 'S001', 'S003'),
(2, 'S002', 'T002');

INSERT INTO kasukabe_timetable_db.public.schedule (id, date, period, lesson_id, teacher_id, count)
VALUES
(1, '2025-05-08', 1, 1, 'T001', 1),
(2, '2025-05-08', 2, 3, 'T001', 1),
(3, '2025-05-08', 3, 5, 'T001', 1);
