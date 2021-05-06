CREATE TABLE public.roles (
	id serial NOT NULL,
	rol varchar(20) NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (id)
);

INSERT INTO public.roles (id, rol) VALUES(1, 'Admin');
INSERT INTO public.roles (id, rol) VALUES(2, 'SST');
INSERT INTO public.roles (id, rol) VALUES(3, 'Planta');

CREATE TABLE public.workers (
	cc varchar(20) NOT NULL,
	email varchar(50) NOT NULL,
	"password" varchar(20) NOT NULL,
	first_name varchar(20) NOT NULL,
	last_name varchar(20) NOT NULL,
	id_rol int4 NOT NULL,
	active boolean NOT NULL,
	CONSTRAINT workers_pk PRIMARY KEY (cc),
	CONSTRAINT workers_fk FOREIGN KEY (id_rol) REFERENCES public.roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO public.workers (cc, email, "password", first_name, last_name, id_rol, active) VALUES('1152467988', 'federico29.mg@gmail.com', '123', 'Federico', 'Montoya', 1, true);
INSERT INTO public.workers (cc, email, "password", first_name, last_name, id_rol, active) VALUES('1000290655', 'chzdiane22@gmail.com', '456', 'Dianella', 'Restrepo', 2, true);
INSERT INTO public.workers (cc, email, "password", first_name, last_name, id_rol, active) VALUES('1000869566', 'bitas200225@gmail.com', '789', 'Sebastian', 'Guzman', 3, true);

CREATE TABLE public.risks (
	id serial NOT NULL,
	risk varchar(20) NOT NULL,
	CONSTRAINT risks_pk PRIMARY KEY (id)
);

INSERT INTO public.risks (id, risk) VALUES(1, 'Alto');
INSERT INTO public.risks (id, risk) VALUES(2, 'Medio');
INSERT INTO public.risks (id, risk) VALUES(3, 'Bajo');

CREATE TABLE public.incidents (
	id serial NOT NULL,
	title varchar(50) NOT NULL,
	description text NOT NULL,
	id_risk int4 NOT NULL,
	cc_worker varchar(20) NOT NULL,
	CONSTRAINT incidents_pk PRIMARY KEY (id),
	CONSTRAINT incidents_fk FOREIGN KEY (id_risk) REFERENCES public.risks(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT incidents_fk_1 FOREIGN KEY (cc_worker) REFERENCES public.workers(cc) ON UPDATE CASCADE
);

INSERT INTO public.incidents (id, title, description, id_risk, cc_worker) VALUES(1, 'Incidente #1', 'Descripcion #1', 1, '1000869566');
INSERT INTO public.incidents (id, title, description, id_risk, cc_worker) VALUES(2, 'Incidente #2', 'Descripcion #2', 2, '1000869566');
INSERT INTO public.incidents (id, title, description, id_risk, cc_worker) VALUES(3, 'Incidente #3', 'Descripcion #3', 3, '1000290655');

CREATE TABLE public.solutions (
	id serial NOT NULL,
	description text NOT NULL,
	id_incident int4 NOT NULL,
	cc_worker varchar(20) NULL,
	CONSTRAINT solutions_pk PRIMARY KEY (id),
	CONSTRAINT solutions_fk FOREIGN KEY (id_incident) REFERENCES public.incidents(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT solutions_fk_1 FOREIGN KEY (cc_worker) REFERENCES public.workers(cc) ON UPDATE CASCADE
);

INSERT INTO public.solutions (id, description, id_incident, cc_worker) VALUES(1, 'Solucion #1', 1, '1000290655');

