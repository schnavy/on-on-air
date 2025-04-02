--
-- PostgreSQL database dump
--

-- Dumped from database version 13.20 (Debian 13.20-1.pgdg120+1)
-- Dumped by pg_dump version 13.20 (Debian 13.20-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."_RadioTags" DROP CONSTRAINT IF EXISTS "_RadioTags_B_fkey";
ALTER TABLE IF EXISTS ONLY public."_RadioTags" DROP CONSTRAINT IF EXISTS "_RadioTags_A_fkey";
ALTER TABLE IF EXISTS ONLY public."_RadioGenres" DROP CONSTRAINT IF EXISTS "_RadioGenres_B_fkey";
ALTER TABLE IF EXISTS ONLY public."_RadioGenres" DROP CONSTRAINT IF EXISTS "_RadioGenres_A_fkey";
ALTER TABLE IF EXISTS ONLY public."Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey";
DROP INDEX IF EXISTS public."_RadioTags_B_index";
DROP INDEX IF EXISTS public."_RadioTags_AB_unique";
DROP INDEX IF EXISTS public."_RadioGenres_B_index";
DROP INDEX IF EXISTS public."_RadioGenres_AB_unique";
DROP INDEX IF EXISTS public."User_email_key";
DROP INDEX IF EXISTS public."Tag_title_key";
DROP INDEX IF EXISTS public."Session_sessionToken_key";
DROP INDEX IF EXISTS public."Genre_title_key";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."VerificationToken" DROP CONSTRAINT IF EXISTS "VerificationToken_pkey";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."Tag" DROP CONSTRAINT IF EXISTS "Tag_pkey";
ALTER TABLE IF EXISTS ONLY public."Radio" DROP CONSTRAINT IF EXISTS "Radio_pkey";
ALTER TABLE IF EXISTS ONLY public."Genre" DROP CONSTRAINT IF EXISTS "Genre_pkey";
ALTER TABLE IF EXISTS public."Tag" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public."Radio" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public."Genre" ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."_RadioTags";
DROP TABLE IF EXISTS public."_RadioGenres";
DROP TABLE IF EXISTS public."VerificationToken";
DROP TABLE IF EXISTS public."User";
DROP SEQUENCE IF EXISTS public."Tag_id_seq";
DROP TABLE IF EXISTS public."Tag";
DROP TABLE IF EXISTS public."Session";
DROP SEQUENCE IF EXISTS public."Radio_id_seq";
DROP TABLE IF EXISTS public."Radio";
DROP SEQUENCE IF EXISTS public."Genre_id_seq";
DROP TABLE IF EXISTS public."Genre";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Genre; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public."Genre" (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public."Genre" OWNER TO david;

--
-- Name: Genre_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

CREATE SEQUENCE public."Genre_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Genre_id_seq" OWNER TO david;

--
-- Name: Genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david
--

ALTER SEQUENCE public."Genre_id_seq" OWNED BY public."Genre".id;


--
-- Name: Radio; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public."Radio" (
    id integer NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    reviewed boolean DEFAULT false NOT NULL,
    description text NOT NULL,
    slug text NOT NULL,
    status text DEFAULT 'submission'::text NOT NULL,
    active boolean DEFAULT false NOT NULL,
    location text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Radio" OWNER TO david;

--
-- Name: Radio_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

CREATE SEQUENCE public."Radio_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Radio_id_seq" OWNER TO david;

--
-- Name: Radio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david
--

ALTER SEQUENCE public."Radio_id_seq" OWNED BY public."Radio".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public."Session" (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone
);


ALTER TABLE public."Session" OWNER TO david;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public."Tag" (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public."Tag" OWNER TO david;

--
-- Name: Tag_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

CREATE SEQUENCE public."Tag_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tag_id_seq" OWNER TO david;

--
-- Name: Tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david
--

ALTER SEQUENCE public."Tag_id_seq" OWNED BY public."Tag".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    password text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."User" OWNER TO david;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO david;

--
-- Name: _RadioGenres; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public."_RadioGenres" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_RadioGenres" OWNER TO david;

--
-- Name: _RadioTags; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public."_RadioTags" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_RadioTags" OWNER TO david;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO david;

--
-- Name: Genre id; Type: DEFAULT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."Genre" ALTER COLUMN id SET DEFAULT nextval('public."Genre_id_seq"'::regclass);


--
-- Name: Radio id; Type: DEFAULT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."Radio" ALTER COLUMN id SET DEFAULT nextval('public."Radio_id_seq"'::regclass);


--
-- Name: Tag id; Type: DEFAULT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."Tag" ALTER COLUMN id SET DEFAULT nextval('public."Tag_id_seq"'::regclass);


--
-- Data for Name: Genre; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public."Genre" (id, title) FROM stdin;
86	Underground
87	Experimental
88	Electronic
89	Ambient
90	World Music
91	Hip-Hop
92	Indie
93	Punk
94	Techno
95	Jazz
96	Global Music
97	Talk
98	Sound Art
99	House
100	Bass Music
101	Spoken Word
102	Field Recordings
\.


--
-- Data for Name: Radio; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public."Radio" (id, title, url, "createdAt", "updatedAt", reviewed, description, slug, status, active, location) FROM stdin;
43	Kiosk Radio	https://kioskradio.com/	2024-10-27 23:32:22.286	2024-10-27 23:32:22.286	f	An independent outdoor radio in Brussels, Belgium	kiosk-radio	submitted	t	Brussels, Belgium
44	Radio Angrezi	https://radioangrezi.de/	2024-10-27 23:32:22.291	2024-10-27 23:32:22.291	f	A cultural radio focused on diversity from Bremen, Germany	radio-angrezi	submitted	t	Bremen, Germany
45	Hallo Radio	https://www.halloradio.net/	2024-10-27 23:32:22.296	2024-10-27 23:32:22.296	f	A DIY alternative radio from Hamburg, Germany	hallo-radio	submitted	t	Hamburg, Germany
48	Sphere Radio	https://sphere-radio.net/	2024-10-27 23:32:22.334	2024-10-27 23:32:22.334	f	An eclectic community radio from Leipzig, Germany	sphere-radio	submitted	t	Leipzig, Germany
49	Radio Corax	https://radiocorax.de/	2024-10-27 23:32:22.338	2024-10-27 23:32:22.338	f	A non-profit radio with cultural programming from Halle, Germany	radio-corax	submitted	t	Halle, Germany
50	Cashmere Radio	https://cashmereradio.com/about/	2024-10-27 23:32:22.342	2024-10-27 23:32:22.342	f	An avant-garde cultural radio from Berlin Lichtenberg	cashmere-radio	submitted	t	Berlin Lichtenberg, Germany
51	EOS Radio	https://www.eosradio.de/	2024-10-27 23:32:22.348	2024-10-27 23:32:22.348	f	An underground electronic radio from Frankfurt, Germany	eos-radio	submitted	t	Frankfurt, Germany
52	Radio Grenouille	https://www.radiogrenouille.com/	2024-10-27 23:32:22.354	2024-10-27 23:32:22.354	f	A community art radio from Marseille, France	radio-grenouille	submitted	t	Marseille, France
53	Radio AlHara	https://yamakan.place/palestine/	2024-10-27 23:32:22.358	2024-10-27 23:32:22.358	f	A cultural exchange radio from Bethlehem, Palestine	radio-alhara	submitted	t	Bethlehem, Palestine
54	DubLab	https://www.dublab.com/	2024-10-27 23:32:22.363	2024-10-27 23:32:22.363	f	A nonprofit radio for innovative sounds in Los Angeles, US	dublab	submitted	t	Los Angeles, US
55	The Lot Radio	https://www.thelotradio.com/	2024-10-27 23:32:22.368	2024-10-27 23:32:22.368	f	An independent radio from Brooklyn, NYC, US	the-lot-radio	submitted	t	Brooklyn, NYC, US
56	Resonance Extra	https://extra.resonance.fm	2024-10-27 23:32:22.372	2024-10-27 23:32:22.372	f	An avant-garde art radio from London, UK	resonance-extra	submitted	t	London, UK
57	Noods Radio	https://www.noodsradio.com/	2024-10-27 23:32:22.377	2024-10-27 23:32:22.377	f	An underground DJ radio from Bristol, UK	noods-radio	submitted	t	Bristol, UK
58	Radio Quantica	https://www.radioquantica.com/	2024-10-27 23:32:22.38	2024-10-27 23:32:22.38	f	An avant-garde radio representing the Lisbon scene	radio-quantica	submitted	t	Lisbon, Portugal
59	Radio Relativa	https://radiorelativa.eu/	2024-10-27 23:32:22.384	2024-10-27 23:32:22.384	f	An independent eclectic radio from Madrid, Spain	radio-relativa	submitted	t	Madrid, Spain
60	Ja Ja Ja Nee Nee Nee	https://www.jajajaneeneenee.com/	2024-10-27 23:32:22.389	2024-10-27 23:32:22.389	f	An experimental art radio from Amsterdam, Netherlands	ja-ja-ja-nee-nee-nee	submitted	t	Amsterdam, Netherlands
61	Radio Papesse	https://www.radiopapesse.org/	2024-10-27 23:32:22.393	2024-10-27 23:32:22.393	f	A nonprofit art radio from Florence, Italy	radio-papesse	submitted	t	Florence, Italy
46	Radio 80000	https://www.radio80k.de/	2024-10-27 23:32:22.3	2024-10-28 00:51:10.201	f	A community radio representing the Munich scene	radio-80000	submitted	t	Munich, Germany
47	NTS Radio	https://www.nts.live/	2024-10-27 23:32:22.329	2024-10-28 00:56:55.956	f	A global radio broadcasting from London, UK	nts-radio	submitted	t	London, UK
62	Lyl Radio	https://lyl.live/	2024-10-28 19:52:48.199	2024-10-28 19:52:48.199	f	An underground community radio with a multicultural approach from Lyon, France	lyl-radio	submitted	t	Lyon, France
63	Movement Radio	https://www.movement.radio/	2024-10-28 19:52:48.211	2024-10-28 19:52:48.211	f	A cultural exchange and experimental radio from Athens, Greece	movement-radio	submitted	t	Athens, Greece
64	Radio Raheem	https://www.radioraheem.it/	2024-10-28 19:52:48.217	2024-10-28 19:52:48.217	f	A vibrant independent radio representing Milan’s underground music scene	radio-raheem	submitted	t	Milan, Italy
65	Radio Campus Paris	https://www.radiocampusparis.org/	2024-10-28 19:52:48.254	2024-10-28 19:52:48.254	f	A community-driven student radio from Paris, France	radio-campus-paris	submitted	t	Paris, France
66	Ma3azef Radio	https://ma3azef.com/radio/	2024-10-28 19:52:48.261	2024-10-28 19:52:48.261	f	An experimental radio showcasing alternative and underground music from the Arab world	ma3azef-radio	submitted	t	Remote/Online
68	Hotel Radio Paris	https://www.hotelradioparis.com/	2024-10-28 19:52:48.273	2024-10-28 19:52:48.273	f	An indie community radio from Paris, France	hotel-radio-paris	submitted	t	Paris, France
69	Orfium Radio	https://www.orfium.com/radio	2024-10-28 19:52:48.28	2024-10-28 19:52:48.28	f	A virtual radio station for creative music culture	orfium-radio	submitted	t	Online
67	Mutant Radio	https://www.mutantradio.net/	2024-10-28 19:52:48.266	2024-10-28 20:00:21.009	f	A nomadic experimental station with roots in Tbilisi, Georgia	mutant-radio	submitted	t	Tbilisi, Georgia
74	GDS FM	https://gds.fm/	2024-12-05 10:51:46.016	2024-12-13 13:11:32.156	f	Default description	gds-fm	submission	f	Zurich, Switzerland
42	THF Radio	https://www.thfradio.de/de	2024-10-27 23:32:22.279	2024-11-14 15:35:26.734	f	A community radio from Berlin, Germany	thf-radio	submitted	t	Berlin, Germany
70	Operator Radio	https://operator-radio.com/	2024-11-14 15:36:43.133	2024-11-14 15:37:01.096	f	Default description	operator-radio	submission	f	Rotterdam, Netherlands
71	HGB Radio	https://www.instagram.com/hgbradio/	2024-11-14 22:51:22.806	2024-11-15 10:54:24.361	f	Leipzig, Germany	hgb-radio	submission	f	Leipzig, Germany
72	Radio Blau	https://www.instagram.com/radioblau/	2024-11-18 22:47:53.257	2024-11-18 22:48:10.773	f	Default description	radio-blau	submission	f	Leipzig, Germany
75	Callshop Radio	https://callshopradio.com/	2024-12-05 10:52:18.461	2024-12-05 10:52:32.068	f	Default description	callshop-radio	submission	f	Düseeldorf, Germany
73	WFMU Radio	https://wfmu.org/	2024-11-21 11:03:58.531	2024-12-05 10:53:43.55	f	Default description	wfmu-radio	submission	f	New York City + New Jersey, US
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
ff027560-a20c-4d58-bc0f-718b33f55d20	cm2rzok130000u36uqwm0nslu	2024-11-26 19:55:43.539	2024-10-27 19:55:43.54	2024-10-27 19:55:43.54
15054004-93ab-4985-8dbd-c8178666763d	cm2rzok130000u36uqwm0nslu	2024-11-26 20:41:15.533	2024-10-27 20:41:15.534	2024-10-27 20:41:15.534
bbbc61f8-dba0-4335-b863-ed4a7c9f9f75	cm2rzok130000u36uqwm0nslu	2024-11-26 22:02:46.007	2024-10-27 22:02:46.008	2024-10-27 22:02:46.008
07212af7-e010-4c37-ace1-06c4af1525fb	cm2rzok130000u36uqwm0nslu	2024-11-27 19:57:25.876	2024-10-28 19:57:25.877	2024-10-28 19:57:25.877
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public."Tag" (id, title) FROM stdin;
100	DJ Sets
105	Independent
108	International
110	DIY
115	Global Reach
117	Non-profit
126	Nonprofit
132	Bristol Scene
101	Berlin Scene
103	Outdoor Radio
107	Community
111	Alternative
113	Underground
118	Avant-garde
121	Frankfurt Scene
123	Middle Eastern Scene
128	Brooklyn Scene
133	Lisbon Scene
134	Madrid Scene
137	Sound Experiments
102	Community Radio
104	Live Sessions
106	Cultural Diversity
109	Underground Music
112	Munich Scene
116	Cultural Programming
119	Sound Exploration
122	Art Radio
124	Cultural Exchange
127	Innovative Sounds
114	Eclectic
120	Cultural
125	Global Sound
129	Live Sets
130	Sound Art
131	DJ Collectives
135	Eclectic Programming
136	Contemporary Art
138	Cultural Projects
139	Lyon Scene
140	Experimental
142	Student Radio
145	Nomadic Radio
149	Creative Community
141	Milan Scene
143	Paris Scene
144	Arab World
147	Global Culture
146	Tbilisi Scene
148	Virtual Radio
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public."User" (id, email, "emailVerified", "createdAt", "updatedAt", password) FROM stdin;
cm2rzok130000u36uqwm0nslu	david.jo@icloud.com	2024-10-30 23:40:07.554	2024-10-27 19:34:53.799	2024-10-30 23:40:07.555	$2a$10$xa.IhIY17QAiLkzgGq5B9ex1sNV/pCYcQ3FX/XCC03mAW8FKyq0Iq
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
david.jo@icloud.com	c5fb353a121d192a40720053842b6a9cf75491eb0a88eacc61d4e7a27ef58002	2024-10-28 20:20:54.066
david.jo@icloud.com	2ddab4518905c764bedeffa653c88ad6f815154ca6acddccaff30ac89670170c	2024-10-28 20:33:26.83
david.jo@icloud.com	ddf7ba1abf1b969fdbda6d6935b35e0586568262bd46d08ee1e14e5ab4b736d9	2024-10-28 20:47:52.228
david.jo@icloud.com	fd297fea9b1d2f1aef9b1716303eba0b7e0eae93fd45c6e3dcfda381a98880e9	2024-10-28 21:09:26.068
mail@davidwahrenburg.de	93e323fa6cf5fae6caef4a888eacf951f310d591a7c7e16a03cad1a4418abe70	2024-10-28 21:15:40.595
mail@davidwahrenburg.de	ac6679fc64fab9fe314188a5a816f55b0aa2334984cd48e605501af936ec0be2	2024-10-28 21:16:01.67
mail@davidwahrenburg.de	3e8378441aa1fb7e131b74d0655e7db311be51b0900c73390d06b114b178746c	2024-10-28 21:16:46.491
mail@davidwahrenburg.de	af00a23351152d49acb823bedb506ab359ae7ee609064f880cfc72c69f02c9fc	2024-10-28 21:23:21.138
mail@davidwahrenburg.de	e94ef12c1e959ecd8dc88a01ec6005be770ea180e275cf86676f02eb34e9b7cf	2024-10-28 21:51:29.888
david.jo@icloud.com	a0e8227116b462156a7a65209622916e5bb0fa4b0c7b7880183991ac002d71e3	2024-11-01 00:36:13.588
david.jo@icloud.com	062cf2baa6bcf8f502062faee8399f2dee82d74746d7c7091408c3e80659be56	2024-11-01 00:36:23.137
\.


--
-- Data for Name: _RadioGenres; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public."_RadioGenres" ("A", "B") FROM stdin;
87	62
88	62
96	62
88	63
89	63
96	63
87	64
88	64
99	64
87	65
88	65
92	65
95	65
87	66
88	66
96	66
87	67
88	67
89	67
87	68
88	68
92	68
87	69
88	69
89	69
86	42
87	42
88	42
87	43
88	43
89	43
87	44
90	44
91	44
87	45
92	45
93	45
87	46
88	46
94	46
87	47
88	47
95	47
96	47
87	48
88	48
89	48
87	49
88	49
95	49
97	49
87	50
88	50
89	50
98	50
87	51
88	51
94	51
99	51
87	52
88	52
90	52
95	52
87	53
88	53
96	53
87	54
88	54
89	54
90	54
87	55
88	55
94	55
99	55
87	56
89	56
98	56
87	57
88	57
96	57
100	57
87	58
88	58
94	58
87	59
88	59
92	59
87	60
98	60
101	60
87	61
98	61
102	61
\.


--
-- Data for Name: _RadioTags; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public."_RadioTags" ("A", "B") FROM stdin;
62	105
62	102
62	139
63	105
63	124
63	140
64	100
64	105
64	141
65	102
65	142
65	143
66	105
66	111
66	144
67	105
67	145
67	146
68	105
68	102
68	143
69	149
69	147
69	148
42	100
42	101
42	102
43	105
43	103
43	104
44	108
44	107
44	106
45	110
45	111
45	109
46	113
46	102
46	112
47	105
47	115
47	114
48	105
48	102
48	114
49	117
49	102
49	116
50	118
50	119
50	120
51	100
51	113
51	121
52	107
52	116
52	122
53	123
53	124
53	125
54	126
54	127
54	114
55	105
55	128
55	129
56	118
56	120
56	130
57	132
57	113
57	131
58	113
58	118
58	133
59	105
59	134
59	135
60	137
60	122
60	136
61	126
61	122
61	138
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
78b03d91-4b2c-4cf8-b628-8846bd169fd3	a44fbccdbbf86017c04135ac536c0583497c2984a20ea80760599af9f892df6d	2024-10-27 19:21:36.589542+00	20241023221432_update	\N	\N	2024-10-27 19:21:36.585402+00	1
a383e4f7-3101-453a-ada0-2f90f3273ff3	ee3c6026cc8fd74fdf00594ec4ccde651be7cffe11a40746e9f5fbb623545f8f	2024-10-27 19:21:36.59752+00	20241023225815_241024	\N	\N	2024-10-27 19:21:36.590108+00	1
e0f41292-4769-4549-b8bb-a93e6be85b8c	bfe3d313c9043b0543a22c06cac3647683a92c8c616c0d783c8e2094082dc71a	2024-10-27 19:21:36.599462+00	20241023235123_241024_1	\N	\N	2024-10-27 19:21:36.59803+00	1
50a7ada8-fb38-4641-8882-b7c2b3553f29	5ae4f5bc0380f1812a716e9f07fafad0e8d34a7b51ad07a5b204bc164c152bf1	2024-10-27 19:21:36.611487+00	20241027155256_add_nextauth_models	\N	\N	2024-10-27 19:21:36.600027+00	1
aec3043f-354e-4952-aa5d-eae0851fad1a	41c851e81a8ccb2eea8d4da9ced6143551ab603aa270eac0a942d01d24afb2ad	2024-10-27 19:21:36.615543+00	20241027191841_add_auth	\N	\N	2024-10-27 19:21:36.612135+00	1
18bab229-54c6-4e5c-b2fd-b00c49be8f3b	3ae1b90dfa31855d8d2ba3941a35c96ed8c1226752dc74025c08d30a147fa22a	2024-10-27 20:56:36.247622+00	20241027205636_rm_account	\N	\N	2024-10-27 20:56:36.244515+00	1
627080d1-774c-475a-b380-0511afa09145	1116983d8a33619ed22a8ea886724976d63fe0c761e9310b1c0a1f4c24fe723a	2024-10-27 21:00:22.018081+00	20241027210022_rm_name_from_u_ser	\N	\N	2024-10-27 21:00:22.016276+00	1
ce2d832c-83ba-44c4-95e8-0a478f58f71a	90cf19b21b9648cde22108188df38ad4b4f8f4c8dc782875b2b001252b26f446	2024-10-27 23:05:16.60144+00	20241027230516_add_location	\N	\N	2024-10-27 23:05:16.598041+00	1
17ab8a1d-0302-469e-9644-217ac937591a	ab14ee7e3d48770b06d5885fd838a8b814b3405b7ae0e5666d4f470f4066c332	2024-10-27 23:25:20.242868+00	20241027232520_nm	\N	\N	2024-10-27 23:25:20.230436+00	1
13b28fa3-695b-408e-bbac-5ab22e901549	cd81d24d5a578e433d23dc66e3dca7c8bf85c21152b4475fd1a64d45e95f510e	2024-10-27 23:31:30.694946+00	20241027233130_	\N	\N	2024-10-27 23:31:30.690349+00	1
bff3d667-537b-4234-bad4-a5076edc499b	73927e71166a081c73aa0fce77b6d9cee9f7436f40a16d54eccf00043bd3ed86	2024-11-12 21:33:54.000702+00	20241112213353_pw_col_added_to_user	\N	\N	2024-11-12 21:33:53.997381+00	1
\.


--
-- Name: Genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public."Genre_id_seq"', 102, true);


--
-- Name: Radio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public."Radio_id_seq"', 75, true);


--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public."Tag_id_seq"', 149, true);


--
-- Name: Genre Genre_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."Genre"
    ADD CONSTRAINT "Genre_pkey" PRIMARY KEY (id);


--
-- Name: Radio Radio_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."Radio"
    ADD CONSTRAINT "Radio_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (identifier, token);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Genre_title_key; Type: INDEX; Schema: public; Owner: david
--

CREATE UNIQUE INDEX "Genre_title_key" ON public."Genre" USING btree (title);


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: david
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: Tag_title_key; Type: INDEX; Schema: public; Owner: david
--

CREATE UNIQUE INDEX "Tag_title_key" ON public."Tag" USING btree (title);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: david
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _RadioGenres_AB_unique; Type: INDEX; Schema: public; Owner: david
--

CREATE UNIQUE INDEX "_RadioGenres_AB_unique" ON public."_RadioGenres" USING btree ("A", "B");


--
-- Name: _RadioGenres_B_index; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX "_RadioGenres_B_index" ON public."_RadioGenres" USING btree ("B");


--
-- Name: _RadioTags_AB_unique; Type: INDEX; Schema: public; Owner: david
--

CREATE UNIQUE INDEX "_RadioTags_AB_unique" ON public."_RadioTags" USING btree ("A", "B");


--
-- Name: _RadioTags_B_index; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX "_RadioTags_B_index" ON public."_RadioTags" USING btree ("B");


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _RadioGenres _RadioGenres_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."_RadioGenres"
    ADD CONSTRAINT "_RadioGenres_A_fkey" FOREIGN KEY ("A") REFERENCES public."Genre"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _RadioGenres _RadioGenres_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."_RadioGenres"
    ADD CONSTRAINT "_RadioGenres_B_fkey" FOREIGN KEY ("B") REFERENCES public."Radio"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _RadioTags _RadioTags_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."_RadioTags"
    ADD CONSTRAINT "_RadioTags_A_fkey" FOREIGN KEY ("A") REFERENCES public."Radio"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _RadioTags _RadioTags_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public."_RadioTags"
    ADD CONSTRAINT "_RadioTags_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

