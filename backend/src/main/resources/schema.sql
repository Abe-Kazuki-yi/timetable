DROP TABLE IF EXISTS kasukabe_timetable_db.public.users;
DROP TABLE IF EXISTS kasukabe_timetable_db.public.availability;
DROP TABLE IF EXISTS kasukabe_timetable_db.public.lesson;
DROP TABLE IF EXISTS kasukabe_timetable_db.public.schedule;
DROP TABLE IF EXISTS kasukabe_timetable_db.public.not_contact;
DROP TABLE IF EXISTS kasukabe_timetable_db.public.runnable;

-- ENUM型の定義
DROP TYPE IF EXISTS ROLE;
CREATE TYPE ROLE AS ENUM('ADMIN','TEACHER','STUDENT');

-- テーブル作成
CREATE TABLE IF NOT EXISTS kasukabe_timetable_db.public.users (
	id              VARCHAR(6) PRIMARY KEY,
	firstname       VARCHAR(20) NOT NULL,
	lastname        VARCHAR(20) NOT NULL,
	password        VARCHAR(50) NOT NULL,
	role            ROLE DEFAULT 'STUDENT' NOT NULL,
	grade			VARCHAR(10) NOT NULL,
	deleted_at TIMESTAMP WITH TIME ZONE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

create table if not exists kasukabe_timetable_db.public.availability (
	id              INTEGER PRIMARY KEY,
	user_id       	VARCHAR(6) NOT NULL,
	date        	DATE NOT NULL,
	period        	INTEGER NOT NULL,
	available       BOOLEAN NOT NULL
);

create table if not exists kasukabe_timetable_db.public.lesson (
	id              INTEGER PRIMARY KEY,
	user_id       	VARCHAR(6) NOT NULL,
	subject        	VARCHAR(10) NOT NULL,
	quantity        INTEGER NOT NULL,
	teacher_id      VARCHAR(6),
	request			BOOLEAN,
	individual		BOOLEAN
);

create table if not exists kasukabe_timetable_db.public.schedule (
	id              INTEGER PRIMARY KEY,
	date       		DATE NOT NULL,
	period        	INTEGER NOT NULL,
	lesson_id       INTEGER NOT NULL,
	teacher_id      VARCHAR(6) NOT NULL,
	count 			INTEGER
);

create table if not exists kasukabe_timetable_db.public.not_contact(
	id              INTEGER PRIMARY KEY,
	filer_id		VARCHAR(6) NOT NULL,
	respondent_id   VARCHAR(6) NOT NULL
	);

create table if not exists kasukabe_timetable_db.public.runnable (
	teacher_id		VARCHAR(6) NOT NULL,
	subject			VARCHAR(10) NOT NULL
);