----------------------------------
-- ТАБЛИЦЫ ДЛЯ ХРАНЕНИЯ АППАРАТУРЫ:
----------------------------------

CREATE TABLE apparats (
	id serial, -- --> apparat_id
	name text UNIQUE,
	CONSTRAINT apparats_pkey PRIMARY KEY (id)
);

CREATE TABLE apparat_blocks (
	id serial, -- --> block_id
	apparat_id integer,
	name text,
	width integer, -- --> оригинальный размер фотографии блока в пикселях
	height integer, -- --> оригинальный размер фотографии блока в пикселях
	src text, -- --> ОТНОСИТЕЛЬНЫЙ путь до фотографии блока
	CONSTRAINT apparat_blocks_pkey PRIMARY KEY (id)
);

CREATE TABLE block_elements (
	id serial,
	condition_id integer,
	block_id integer,
	x double precision, -- --> координата x относительно оригинальной width apparat_blocks в процентах
	y double precision, -- --> координата y относительно оригинальной height apparat_blocks в процентах
	width double precision, -- --> ширина относительно оригинальной width apparat_blocks в процентах
	height double precision, -- --> высота относительно оригинальной height apparat_blocks в процентах
	CONSTRAINT block_elements_pkey PRIMARY KEY (id)
);

CREATE TABLE block_cables (
	id serial,
	condition_id integer,
	start_element_id integer, -- --> block_elements -> head_cable
	end_element_id integer, -- --> block_elements -> head_cable
	-- src text, -- --> ОТНОСИТЕЛЬНЫЙ путь до фотографии кабеля
	CONSTRAINT block_cables_pkey PRIMARY KEY (id)
);

CREATE TABLE elements {
	id serial, -- --> element_id
	type_id integer, 
	original_src text UNIQUE, -- --> ОТНОСИТЕЛЬНЫЙ путь до фотографии елемента
	CONSTRAINT element_to_type_pkey PRIMARY KEY (id)
}

CREATE TABLE element_conditions (
	id serial, -- --> condition_id
	element_id integer, -- --> block_elements -> rotator
	CONSTRAINT element_conditions_pkey PRIMARY KEY (id)
);

CREATE TABLE element_condition_positions (
	id serial, -- --> condition_position_id
	condition_id integer, -- --> element_conditions 
	angle integer, -- --> градусы
	order integer, -- --> порядок переключения состояний
	src text, -- --> ОТНОСИТЕЛЬНЫЙ путь до оригинальной фотографии
	CONSTRAINT element_condition_positions_pkey PRIMARY KEY (id)
);

CREATE TABLE types (
	id serial, -- --> type_id
	name text, -- --> имя типа: button / lever / rotator / draggable / head_cable / lights
	CONSTRAINT types_pkey PRIMARY KEY (id)
);

----------------------------------
----------------------------------



----------------------------------
-- ТАБЛИЦЫ ДЛЯ ХРАНЕНИЯ КАРТЫ:
----------------------------------

CREATE TABLE maps (
	id serial, -- --> map_id
	apparat_id integer,
	name text, -- --> ПР: УПРАЖНЕНИЕ N. Настройка очка тов. полковника КАЛАЧА на частоту УКВ радиосети
	CONSTRAINT maps_pkey PRIMARY KEY (id)
);

CREATE TABLE map_elements_init (
	id serial,
	map_id integer,
	element_id integer,
	init_condition_id integer, -- --> condition_id из element_conditions
	CONSTRAINT map_elements_init_pkey PRIMARY KEY (id)
);

CREATE TABLE stages ( 
	id serial, -- --> stage_id
	map_id integer,
	title text, -- --> ПР: ЭТАП 1. Воткнуть антену
	order integer, -- --> порядковый номер этапа
	CONSTRAINT stages_pkey PRIMARY KEY (id)
);

CREATE TABLE group_steps (
	id serial, -- --> group_steps_id
	group_id integer, -- --> group_id
	action_id integer,
	stage_id integer, -- --> идентификатор группы steps, В РАМКАХ КОТОРОГО должны происходить действия
	order integer, -- --> порядковый номер шаг, или: -1 если порядок неважен
	CONSTRAINT group_steps_pkey PRIMARY KEY (id)
);

CREATE TABLE step_to_group (
	id serial,
	group_id integer,
	step_id integer,
	order integer, -- --> порядковый номер шаг, или: -1 если порядок неважен
	CONSTRAINT step_to_group_pkey PRIMARY KEY (id)
);

CREATE TABLE steps (
	id serial, -- --> step_id
	condition_id integer, -- --> condition_id из element_conditions
	CONSTRAINT steps_pkey PRIMARY KEY (id)
);

CREATE TABLE actions (
	id serial, -- --> step_id
	stage_id integer, -- --> идентификатор stage, ПОСЛЕ КОТОРОГО должны происходить действия
	condition_id integer, -- --> condition_id из element_conditions
	order integer, -- --> порядковый номер шаг, или: -1 если порядок неважен
	CONSTRAINT steps_pkey PRIMARY KEY (id)
);


-- CREATE TABLE map_pairs (
-- 	id serial,
-- 	map_id 
-- 	CONSTRAINT map_double_pkey PRIMARY KEY (id)
-- );

----------------------------------
----------------------------------



----------------------------------
-- ТАБЛИЦЫ ДЛЯ ХРАНЕНИЯ СОСТОЯНИЙ:
----------------------------------

CREATE TABLE user (
	id serial, -- --> user_id
	login text,
	role integer,
	password text,
	CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLES sessions (
	id serial, -- --> session_id
	user_id integer,
	session_hash text,
	CONSTRAINT sessions_pkey PRIMARY KEY (id)
);

CREATE TABLE session_info {
	id serial,
	session_id integer,
	apparat_id integer,
	TODO: ...
	CONSTRAINT session_info_pkey PRIMARY KEY (id)
}



CREATE TABLE rooms (
	id serial,
	key text UNIQUE, -- --> ключ комнаты, по которому users заходят в комнату
	creator_id integer, -- --> user.id
	max_user_count integer,
	CONSTRAINT rooms_pkey PRIMARY KEY (id)
);

CREATE TABLE rooms_users (
	id serial,
	room_id integer,
	user_id integer,
	CONSTRAINT rooms_users_pkey PRIMARY KEY (id)
);

-- CREATE TABLE rooms_users (
-- 	id serial,
-- 	room_id integer,
-- 	user_count integer,
-- 	CONSTRAINT rooms_users_pkey PRIMARY KEY (id)
-- );