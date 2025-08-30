--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

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

--
-- Name: enum_user_scores_mode; Type: TYPE; Schema: public; Owner: bijay
--

CREATE TYPE public.enum_user_scores_mode AS ENUM (
    'practice',
    'ranked'
);


ALTER TYPE public.enum_user_scores_mode OWNER TO bijay;

--
-- Name: enum_users_oauth_provider; Type: TYPE; Schema: public; Owner: bijay
--

CREATE TYPE public.enum_users_oauth_provider AS ENUM (
    'local',
    'google'
);


ALTER TYPE public.enum_users_oauth_provider OWNER TO bijay;

--
-- Name: oauth_provider_enum; Type: TYPE; Schema: public; Owner: bijay
--

CREATE TYPE public.oauth_provider_enum AS ENUM (
    'local',
    'google'
);


ALTER TYPE public.oauth_provider_enum OWNER TO bijay;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.bookmarks (
    id integer NOT NULL,
    user_id integer NOT NULL,
    mock_test_id integer NOT NULL
);


ALTER TABLE public.bookmarks OWNER TO bijay;

--
-- Name: bookmarks_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.bookmarks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookmarks_id_seq OWNER TO bijay;

--
-- Name: bookmarks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.bookmarks_id_seq OWNED BY public.bookmarks.id;


--
-- Name: discussions; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.discussions (
    id integer NOT NULL,
    mock_test_id integer NOT NULL,
    message json NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.discussions OWNER TO bijay;

--
-- Name: discussions_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.discussions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discussions_id_seq OWNER TO bijay;

--
-- Name: discussions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.discussions_id_seq OWNED BY public.discussions.id;


--
-- Name: mcq_questions; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.mcq_questions (
    id integer NOT NULL,
    section_id integer NOT NULL,
    question character varying(255) NOT NULL,
    options json NOT NULL,
    answer character varying(255) NOT NULL
);


ALTER TABLE public.mcq_questions OWNER TO bijay;

--
-- Name: mcq_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.mcq_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mcq_questions_id_seq OWNER TO bijay;

--
-- Name: mcq_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.mcq_questions_id_seq OWNED BY public.mcq_questions.id;


--
-- Name: mock_tests; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.mock_tests (
    id integer NOT NULL,
    stream_id integer NOT NULL,
    title character varying(255) NOT NULL,
    time_limit integer NOT NULL,
    question_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.mock_tests OWNER TO bijay;

--
-- Name: mock_tests_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.mock_tests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mock_tests_id_seq OWNER TO bijay;

--
-- Name: mock_tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.mock_tests_id_seq OWNED BY public.mock_tests.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    actor_id integer,
    message character varying(255) NOT NULL,
    type character varying(255) DEFAULT 'info'::character varying NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.notifications OWNER TO bijay;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO bijay;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    mock_test_id integer NOT NULL,
    review text NOT NULL,
    rating double precision,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.reviews OWNER TO bijay;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO bijay;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: sections; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.sections (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    question_weight double precision NOT NULL,
    marks_per_question double precision NOT NULL,
    negative_marking double precision NOT NULL
);


ALTER TABLE public.sections OWNER TO bijay;

--
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sections_id_seq OWNER TO bijay;

--
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;


--
-- Name: streams; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.streams (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.streams OWNER TO bijay;

--
-- Name: streams_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.streams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.streams_id_seq OWNER TO bijay;

--
-- Name: streams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.streams_id_seq OWNED BY public.streams.id;


--
-- Name: test_section_links; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.test_section_links (
    mock_test_id integer NOT NULL,
    section_id integer NOT NULL
);


ALTER TABLE public.test_section_links OWNER TO bijay;

--
-- Name: user_scores; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.user_scores (
    id integer NOT NULL,
    user_id integer NOT NULL,
    mock_test_id integer NOT NULL,
    score integer NOT NULL,
    question_count integer DEFAULT 0 NOT NULL,
    full_marks integer DEFAULT 0 NOT NULL,
    time_limit integer DEFAULT 0 NOT NULL,
    section_scores jsonb DEFAULT '{}'::jsonb,
    unanswered_questions integer DEFAULT 0 NOT NULL,
    elapsed_time integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_scores OWNER TO bijay;

--
-- Name: user_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.user_scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_scores_id_seq OWNER TO bijay;

--
-- Name: user_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.user_scores_id_seq OWNED BY public.user_scores.id;


--
-- Name: user_settings; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.user_settings (
    id integer NOT NULL,
    user_id integer NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_settings OWNER TO bijay;

--
-- Name: user_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.user_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_settings_id_seq OWNER TO bijay;

--
-- Name: user_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.user_settings_id_seq OWNED BY public.user_settings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    number character varying(255),
    bio character varying(255),
    avatar character varying(255),
    blob_name character varying(255),
    oauth_provider public.enum_users_oauth_provider DEFAULT 'local'::public.enum_users_oauth_provider NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO bijay;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO bijay;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bookmarks id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.bookmarks ALTER COLUMN id SET DEFAULT nextval('public.bookmarks_id_seq'::regclass);


--
-- Name: discussions id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.discussions ALTER COLUMN id SET DEFAULT nextval('public.discussions_id_seq'::regclass);


--
-- Name: mcq_questions id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions ALTER COLUMN id SET DEFAULT nextval('public.mcq_questions_id_seq'::regclass);


--
-- Name: mock_tests id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mock_tests ALTER COLUMN id SET DEFAULT nextval('public.mock_tests_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);


--
-- Name: streams id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.streams ALTER COLUMN id SET DEFAULT nextval('public.streams_id_seq'::regclass);


--
-- Name: user_scores id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_scores ALTER COLUMN id SET DEFAULT nextval('public.user_scores_id_seq'::regclass);


--
-- Name: user_settings id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_settings ALTER COLUMN id SET DEFAULT nextval('public.user_settings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.bookmarks (id, user_id, mock_test_id) FROM stdin;
24	69	1
25	1	1
26	69	2
27	69	4
\.


--
-- Data for Name: discussions; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.discussions (id, mock_test_id, message, user_id, created_at) FROM stdin;
919	1	{"text":"hi","mentions":[]}	1	2025-06-06 20:06:47.041+00
920	1	{"text":"hey","mentions":[]}	69	2025-06-06 20:06:52.772+00
921	1	{"text":"hey @","mentions":[{"user_id":1,"label":"Sita Koirala","offset":4,"length":1}]}	69	2025-06-06 20:07:02.812+00
922	1	{"text":"hey @","mentions":[{"user_id":69,"label":"Bijay Rauniyar","offset":4,"length":1}]}	1	2025-06-06 20:07:12.709+00
923	1	{"text":"how are you @","mentions":[{"user_id":1,"label":"Sita Koirala","offset":12,"length":1}]}	69	2025-06-06 20:07:33.532+00
924	1	{"text":"speak @","mentions":[{"user_id":1,"label":"Sita Koirala","offset":6,"length":1}]}	69	2025-06-06 20:07:59.457+00
\.


--
-- Data for Name: mcq_questions; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.mcq_questions (id, section_id, question, options, answer) FROM stdin;
1	3	Which of the following is the smallest unit of length?	{"1": "millimeter", "2": "micrometer", "3": "nanometer", "4": "angstrom unit"}	4
2	3	Which of the following elements does not belong to alkali metals?	{"1": "Na", "2": "Li", "3": "Mg", "4": "K"}	3
3	3	Methyl orange gives ____ colour with base.	{"1": "red", "2": "pink", "3": "orange", "4": "yellow"}	4
4	3	Which of the following is common alcohol (wine)?	{"1": "methyl alcohol", "2": "ethyl alcohol", "3": "propyl alcohol", "4": "butyl alcohol"}	2
5	3	Cobalt oxide is added to ordinary glass to make _______ glass.	{"1": "black", "2": "red", "3": "hard", "4": "blue"}	4
6	3	What should be the amount of sugar to make a saturated solution of sugar in 500gm water at 25°C, if solubility of sugar at that temp. is 20.	{"1": "20", "2": "25", "3": "100", "4": "200"}	3
7	3	The element with atomic no. 24 is:	{"1": "Iron", "2": "Cadmium", "3": "Chromium", "4": "Copper"}	3
8	3	What is the molecular formula for bleaching powder?	{"1": "CaCl2", "2": "CaOCl2", "3": "CuSO4", "4": "MgCl2"}	2
9	3	Glycerol is an example of _______.	{"1": "monohydric alcohol", "2": "dihydric alcohol", "3": "trihydric alcohol", "4": "aldehyde"}	3
10	3	Which of the following metal has highest boiling point?	{"1": "Aluminium", "2": "Silver", "3": "Copper", "4": "Gold"}	1
11	4	Amphibian of plant kingdom is:	{"1": "Algae", "2": "Fungi", "3": "Gymnosperm", "4": "Bryophyta"}	4
12	4	The largest animal cell is _______.	{"1": "Ostrich egg", "2": "RBC", "3": "WBC", "4": "Neuron"}	1
13	4	Nucleolus is present in _______.	{"1": "cytoplasm", "2": "nucleoplasm", "3": "cell membrane", "4": "plastid"}	2
14	4	Which of the following planet spins most slowly?	{"1": "Venus", "2": "Earth", "3": "Mars", "4": "Jupiter"}	1
15	4	Which of the following does not belong to phylum coelenterata?	{"1": "Hydra", "2": "Volvox", "3": "Obelia", "4": "both b and c"}	4
16	4	The animal in which both male and female sex organ are present in a single individual is called:	{"1": "sexual", "2": "asexual", "3": "hermaphrodite", "4": "monosexual"}	3
17	4	The scientific name of "pea" is:	{"1": "Allium sativum", "2": "Rosa indica", "3": "Pisum sativum", "4": "Magnifera indica"}	3
18	4	Crossing over starts in _______.	{"1": "Diplotene", "2": "Zygotene", "3": "Leptotene", "4": "Pachytene"}	1
19	4	What is the gametophyte of fern plant?	{"1": "Thallus", "2": "Inducicum", "3": "Flowers", "4": "Prothallus"}	4
20	4	Bloods are made with _______ tissues.	{"1": "epithelial", "2": "connective", "3": "muscular", "4": "nervous"}	2
21	5	If 36 men can finish a piece of work in 20 days. How many men should be added so that the work can be finished in 4/5 of the time?	{"1": "12", "2": "9", "3": "8", "4": "4"}	2
22	5	A rectangular sheet of paper 30 cm × 16 cm can be formed into two right circular cylinders in two ways, thus the ratio of volume between the cylinder equals to:	{"1": "1:5", "2": "2:5", "3": "3:5", "4": "none"}	4
23	5	Find the least number by which 3920 should be multiplied so that the result is a complete square?	{"1": "5", "2": "28", "3": "25", "4": "20"}	2
24	5	The market price of an article is 25% above its selling price and cost price is 30% less than market price. Then the discount percent is:	{"1": "5%", "2": "15%", "3": "20%", "4": "25%"}	3
25	5	If U = {set of all triangles} A = {set of Δ with at least one angle different from 60°}, then A = _______.	{"1": "Isosceles triangle", "2": "Scalene triangle", "3": "Equilateral triangle", "4": "none"}	2
26	5	At what rate percent per annum will a sum of money double itself in 20 years?	{"1": "10%", "2": "7%", "3": "12%", "4": "5%"}	1
27	6	Which of the following is the smallest unit of length?	{"1": "millimeter", "2": "micrometer", "3": "nanometer", "4": "angstrom unit"}	4
28	6	Which of the following elements does not belong to alkali metals?	{"1": "Na", "2": "Li", "3": "Mg", "4": "K"}	3
29	6	Methyl orange gives ____ colour with base.	{"1": "red", "2": "pink", "3": "orange", "4": "yellow"}	4
30	6	Which of the following is common alcohol (wine)?	{"1": "methyl alcohol", "2": "ethyl alcohol", "3": "propyl alcohol", "4": "butyl alcohol"}	2
31	6	Cobalt oxide is added to ordinary glass to make _______ glass.	{"1": "black", "2": "red", "3": "hard", "4": "blue"}	4
32	5	If θ = 22.5° then 2Sinθ.Cosθ = ?	{"1": "Cos²θ - Sin²θ", "2": "1", "3": "0", "4": "none of the above"}	3
33	5	If (1/m) + (1/(m+3)) = a, then what will be the value of m³ + (a-3)?	{"1": "a", "2": "1", "3": "a(a-3)", "4": "none of the above"}	3
34	5	What must be added to (2a + 5b) to get the same result as (b + 2c) subtracted from (4a + b)?	{"1": "2a - 3b", "2": "3a - 4b", "3": "7a - 2b", "4": "2a - 5b - 2c"}	4
35	5	If n = 4n + m and m = -1, then n = ?	{"1": "2n + m", "2": "1", "3": "0", "4": "none of the above"}	3
36	5	If the ratio of two numbers is 5:6 and their product is 120. Find the numbers.	{"1": "10, 12", "2": "12, 10", "3": "20, 6", "4": "40, 3"}	1
37	5	If (a + b + c) = 6 and (ab + bc + ca) = 11, then a³ + b³ + c³ – 3abc is equal to:	{"1": "15", "2": "16", "3": "17", "4": "none"}	2
38	5	A father's age was four times his son's age in 2042 and two times his son's age in 2060. Find the year of birth of the son?	{"1": "2040", "2": "2038", "3": "2035", "4": "2033"}	2
39	5	If the length of the side of a square is reduced by 20%, then the area will be decreased by:	{"1": "36%", "2": "44%", "3": "15%", "4": "20%"}	1
40	5	If a number is chosen at random from the set of natural numbers less than 30, what is the probability that a prime number is picked?	{"1": "10/29", "2": "12/29", "3": "1/29", "4": "0"}	2
41	5	A group of 7 students have their weights in Kg as follows: 5, 12, 16, 5, 8, 12, 5. What is their modal weight?	{"1": "5 Kg", "2": "12 Kg", "3": "15 Kg", "4": "8 Kg"}	1
42	5	In the adjoining figure, below, "O" is the center of the circle, then find ∠ADC if ∠AOB = 100°.	{"1": "50°", "2": "25°", "3": "75°", "4": "200°"}	1
43	5	An isosceles triangle with AB = AC = 10 cm and BC = 12 cm is inscribed in a circle. Find the radius of the circle?	{"1": "6.25 cm", "2": "6.35 cm", "3": "12.5 cm", "4": "10 cm"}	1
44	5	The area of the following geometrical figure is equal to ____ cm².	{"1": "120", "2": "40", "3": "42", "4": "50"}	2
45	5	What is the radius of a circle if its area and circumference are equal in magnitude?	{"1": "7 unit", "2": "5 unit", "3": "22/7 unit", "4": "2 unit"}	3
46	3	Heart is a muscular organ made of _______ muscles.	{"1": "voluntary", "2": "cardiac", "3": "involuntary", "4": "skeletal"}	2
47	3	Which one of these is not an appropriate method of waste disposal?	{"1": "sanitary landfill", "2": "incineration", "3": "dumping", "4": "piling up at roadside"}	4
48	3	Which one of these is caused by an organism called "Bordetella Pertusis"?	{"1": "tetanus", "2": "whooping cough", "3": "diphtheria", "4": "poliomyelitis"}	2
49	3	One of the objectives of first aid treatment is to _______.	{"1": "save the life of an injured person", "2": "cure a patient", "3": "both of the above", "4": "none of the above"}	1
50	3	Function of vitamin "K" is to _______.	{"1": "improve vision", "2": "blood clotting", "3": "increase blood cell", "4": "improve muscles"}	2
51	3	What is the percentage of water in a normal body weight?	{"1": "60-70", "2": "75-80", "3": "80-90", "4": "85-95"}	1
52	3	Which one of these is not a communicable disease?	{"1": "TB", "2": "Common cold", "3": "Cancer", "4": "Cholera"}	3
53	3	_______ is not a nutrient.	{"1": "Protein", "2": "Medicine", "3": "Vitamin", "4": "Minerals"}	2
54	3	Safe motherhood is not affected by _____.	{"1": "age", "2": "smoking", "3": "weather", "4": "food intake"}	3
55	3	DPT is vaccinated to a child _______ times.	{"1": "1", "2": "2", "3": "3", "4": "4"}	3
56	3	Norplant is a _______.	{"1": "pills", "2": "permanent method of family planning", "3": "Depo-Provera injection", "4": "temporary method of family planning implanted in a mid-arm of a woman"}	4
57	3	Most of the diseases of a community in Nepal can be controlled by _______.	{"1": "improving community environment", "2": "providing clean drinking water", "3": "raising the income level", "4": "providing health services"}	2
58	3	Goiter occurs due to the deficiency of ____.	{"1": "iron", "2": "vitamin", "3": "calcium", "4": "iodine"}	4
59	3	Norplant is a _______.	{"1": "pills", "2": "permanent method of family planning", "3": "Depo-Provera injection", "4": "temporary method of family planning implanted in a mid arm of a woman"}	2
60	3	Most of the disease of a community in Nepal can be controlled by _______.	{"1": "improving community environment", "2": "providing clean drinking water", "3": "raising the income level", "4": "providing health services"}	2
61	3	Goiter occurs due to the deficiency of ____.	{"1": "iron", "2": "vitamin", "3": "calcium", "4": "iodine"}	4
62	3	Full form of AIDS is _______.	{"1": "Acute Immune Deficiency Syndrome", "2": "Acquired Immuno Deficiency Syndrome", "3": "Acquired Immune Deficient Syndrome", "4": "Acquired Immune Deficiency Symptoms"}	2
63	3	Syphilis is caused by _______.	{"1": "Treponema pallidum", "2": "Brodetlla pertusis", "3": "Entamoeba hystolytica", "4": "Corynebacterium diphtheria"}	1
64	3	The most appropriate age group to become pregnant for a woman is _______.	{"1": "15-20 years", "2": "20-25 years", "3": "25-35 years", "4": "35-40 years"}	3
65	3	Which of these is not a female reproductive organ?	{"1": "uterus", "2": "fallopian tube", "3": "scrotum", "4": "cervix"}	3
66	3	Family health is not affected by _______.	{"1": "literacy", "2": "household size", "3": "cultural environment", "4": "geographic environment"}	4
67	3	Which of these is not a micro-organism?	{"1": "virus", "2": "cell", "3": "bacteria", "4": "fungus"}	2
68	3	Nepali people need _______ caloric food on an average a day.	{"1": "2000", "2": "2250", "3": "2500", "4": "2750"}	3
69	3	Human body has _______ pieces of bones.	{"1": "204", "2": "206", "3": "208", "4": "210"}	2
70	3	Cause of population change is _______.	{"1": "birth rate", "2": "immigration", "3": "death rate", "4": "all of above"}	4
71	3	Purification of milk is called _______.	{"1": "sterilization", "2": "pasteurization", "3": "distillation", "4": "filtration"}	2
72	3	Child mortality rate in Nepal is high due to _______.	{"1": "fever", "2": "acute respiratory infection", "3": "tetanus", "4": "all of the above"}	4
73	3	Which of these is not a viral disease?	{"1": "poliomyelitis", "2": "measles", "3": "leprosy", "4": "hepatitis"}	3
74	6	Suman speaks ______ English.	{"1": "fluent", "2": "fluently", "3": "fluency", "4": "flowing"}	2
75	6	He is sitting ____ the table ____ the bench.	{"1": "on, on", "2": "at, on", "3": "at, at", "4": "on, at"}	2
76	6	She is junior ______ me.	{"1": "to", "2": "than", "3": "with", "4": "by"}	1
77	6	They ______ him to cut wood.	{"1": "got", "2": "made", "3": "had", "4": "make"}	3
78	6	The letter was written ______ red ink.	{"1": "in", "2": "with", "3": "on", "4": "by"}	1
79	6	The teacher said to me, "You can do if you try".	{"1": "The teacher told me that she could do if I tried.", "2": "The teacher told me that I could do if I tried.", "3": "The teacher told me that you can do if you try.", "4": "The teacher told me that I can do if I try."}	2
80	6	Their _______ based on facts.	{"1": "information is", "2": "informations are", "3": "information are", "4": "informations is"}	1
81	6	You'd better _______ a doctor.	{"1": "seen", "2": "to see", "3": "see", "4": "seeing"}	3
82	6	I have been teaching English ______ 1999.	{"1": "for", "2": "since", "3": "from", "4": "to"}	2
83	6	The correct spelling is _______.	{"1": "karnel", "2": "colonel", "3": "colonell", "4": "kornel"}	2
84	6	She does not _______ money.	{"1": "has", "2": "have", "3": "had", "4": "gets"}	2
85	6	One of the girls _______ gone out.	{"1": "have", "2": "are", "3": "has", "4": "is"}	3
86	6	The hotter it is, _______ I feel.	{"1": "more miserable", "2": "the more miserable", "3": "the much miserable", "4": "the most miserable"}	2
87	6	Antonym of brave is:	{"1": "coward", "2": "army officer", "3": "greedy", "4": "policeman"}	1
88	6	I am _______ to take revenge.	{"1": "good enough", "2": "enough good", "3": "experienced good", "4": "enough better"}	1
89	6	Had I been born in the USA, I _______ a car.	{"1": "had purchased", "2": "will have purchased", "3": "would purchase", "4": "would have purchased"}	4
90	6	He was not _______ Indian.	{"1": "a", "2": "an", "3": "the", "4": "no article"}	2
91	6	Let us go home, _______?	{"1": "shall we", "2": "will we", "3": "will you", "4": "shall I"}	1
92	6	I am used to _______ late night.	{"1": "read", "2": "reading", "3": "reads", "4": "red"}	2
93	6	She is _______ NCC officer.	{"1": "a", "2": "the", "3": "no article", "4": "an"}	4
94	6	The driver is good _______ driving.	{"1": "at", "2": "in", "3": "for", "4": "on"}	1
95	6	She had never _______ by an insect.	{"1": "been stung", "2": "been stunged", "3": "was stung", "4": "been stunged"}	1
96	6	I saw him _______.	{"1": "played", "2": "had played", "3": "play", "4": "to play"}	3
97	6	You will pass the final exam _______ you study hard.	{"1": "because of", "2": "so that", "3": "provided that", "4": "as though"}	3
98	6	In 2020, she ______ in the same school.	{"1": "will be working", "2": "will work", "3": "will have worked", "4": "will be work"}	1
99	1	Astronomical unit (AU) is distance between Earth and Sun. 1 AU =	{"1": "1.496 x 10^8 Km", "2": "9.46 x 10^12 Km", "3": "3.084 x 10^13 Km", "4": "None"}	1
100	1	The magnitude of the sum of the two vectors is equal to the difference of their magnitudes. What is the angle between the vectors?	{"1": "0°", "2": "45°", "3": "90°", "4": "180°"}	4
101	1	A particle is moving on a straight line path with constant acceleration directed along the direction of instantaneous velocity. Which of the following statement is true?	{"1": "Particle may reverse the direction of motion.", "2": "Distance covered = magnitude of displacement.", "3": "Average velocity is less than average speed.", "4": "Average velocity = instantaneous velocity."}	2
102	1	A ball is projected from the top of a tower at an angle 60° with the vertical. What happens to the vertical component of its velocity?	{"1": "Increases continuously.", "2": "Decreases continuously.", "3": "Remains unchanged.", "4": "First decreases and then increases."}	2
103	1	A particle moving along a circular path due to a centripetal force having constant magnitude is an example of motion with:	{"1": "Constant speed and velocity.", "2": "Variable speed and velocity.", "3": "Variable speed and constant velocity.", "4": "Constant speed and variable velocity."}	4
104	1	A rod of mass M and length L is lying on a horizontal table. The work done in making it stand on one end will be:	{"1": "MgL", "2": "MgL/2", "3": "MgL/4", "4": "2MgL"}	2
105	1	A body weighs:	{"1": "Very slightly greater at night", "2": "Very slightly less at night.", "3": "Exactly equal at day & night.", "4": "Zero at night."}	2
106	1	Two vessels have different base area. They are filled with water to the same height. If the amount of water in one be 4 times that in the other, then the ratio of pressure on their bottom will be:	{"1": "16:1", "2": "8:1", "3": "4:1", "4": "1:1"}	4
107	1	The speed of light in air is 3 x 10^8 m/s. What will be its speed in diamond whose refractive index is 2.4?	{"1": "3 x 10^8 m/s", "2": "330 m/s", "3": "1.25 x 10^8 m/s", "4": "224 x 10^8 m/s"}	3
108	1	Critical angle for water is:	{"1": "24°", "2": "49°", "3": "42°", "4": "35°"}	3
109	1	The pressure of H2 gas at a gas thermometer is 80cm at 0°C, 110cm at 100°C. At what temperature will it record 95cm pressure?	{"1": "50°C", "2": "75°C", "3": "95°C", "4": "150°C"}	2
110	1	Heat required to raise the temperature of a body through 1°C is known as:	{"1": "Specific heat capacity", "2": "Water equivalent", "3": "Molar specification", "4": "Thermal capacity"}	4
111	1	The diameter of a wire is reduced to half. Now the resistance changes by factor:	{"1": "2", "2": "4", "3": "8", "4": "16"}	4
129	3	A patient is generally advised to consume more meat, lentils, milk and egg when he/she suffers from:	{"1": "Rickets", "2": "Kwashiorkor", "3": "Anaemia", "4": "Scurvy"}	2
130	3	Tetanus disease is:	{"1": "Viral", "2": "Bacterial", "3": "Fungal", "4": "None"}	2
131	3	Kind of epithelium in inner lining of blood vessels?	{"1": "Cuboidal epithelium", "2": "Columnar", "3": "Ciliated columnar", "4": "Squamous epithelium"}	4
132	3	Which part of brain is involved in regulating body temperature?	{"1": "Medulla oblongata", "2": "Cerebrum", "3": "Cerebellum", "4": "Hypothalamus"}	4
133	3	Antibiotic was coined by:	{"1": "Pasteur", "2": "Edward Jenner", "3": "Fleming", "4": "Salman Waksman"}	4
134	3	Not a feature of Annelida?	{"1": "Closed circulatory system", "2": "Segmentation", "3": "Pseudocoelom", "4": "Ventral nerve cord"}	3
135	3	Evolutionary history of organism is:	{"1": "Phylogeny", "2": "Ancestry", "3": "Paleontology", "4": "Ontogeny"}	1
136	3	HIV that caused AIDS first starts destroying:	{"1": "B-Lymphocytes", "2": "Platelets", "3": "Leucocytes", "4": "Helper T-cells"}	4
137	3	Blood calcium level is lowered by deficiency of:	{"1": "Parathormone", "2": "Calcitonin", "3": "Thyroxine", "4": "Both b and c"}	1
138	3	1st healthy mammal to be cloned is:	{"1": "Molly sheep", "2": "Dolly sheep", "3": "Polly sheep", "4": "Monkey"}	2
139	3	Ribosome can also be called:	{"1": "Microsome", "2": "Oxyosome", "3": "Dictyosome", "4": "Ribonucleotide"}	1
140	3	The first transgenic crop is:	{"1": "Tobacco", "2": "Wheat", "3": "Tomato", "4": "Maize"}	1
141	3	Tobacco mosaic virus is:	{"1": "Rod shaped", "2": "Brick shaped", "3": "Spherical", "4": "None"}	1
142	3	Bacterial DNA is identified as:	{"1": "DNA only", "2": "DNA with histone", "3": "DNA without histone", "4": "DNA and RNA"}	3
143	3	Which is sensitive to SO2 pollution?	{"1": "Lichens", "2": "Algae", "3": "Mosses", "4": "Gymnosperms"}	1
144	3	Cause of motility in male gamete is:	{"1": "Phototaxis", "2": "Chemotaxis", "3": "Thermotaxis", "4": "Thermotropism"}	2
145	3	Milk is purified by:	{"1": "Fermentation", "2": "Pasteurisation", "3": "Preservation", "4": "Sterilisation"}	2
146	3	Pollution can bring change in:	{"1": "Abiotic environment", "2": "Biotic environment", "3": "Both a and b", "4": "Animals"}	3
147	3	BOD is:	{"1": "Biological oxygen deficit", "2": "Biosphere oxygen demand", "3": "Biological oxygen demand", "4": "None"}	3
148	3	Which part of cinchona is used as a drug?	{"1": "Bark", "2": "Leaf", "3": "Pericarp", "4": "Endosperm"}	1
149	5	Set A is a proper subset of B if:	{"1": "A-B ⊂ A", "2": "B-A ⊂ B", "3": "A ⊂ B", "4": "A ⊄ B"}	3
150	5	If A and B are two sets containing 10 and 20 distinct elements respectively, then the minimum number of elements in A∪B is:	{"1": "30", "2": "50", "3": "40", "4": "80"}	1
151	5	The value of |sin²θ-cos²θ|:	{"1": "2", "2": "-1", "3": "π", "4": "0"}	1
152	5	The sum of the series Sn = 1² + 2² + 3² + .....n² is:	{"1": "n(n+1)", "2": "n(n+1)(2n+1)/6", "3": "n(n+1)/2", "4": "(n+1)²/2"}	2
153	5	If 6, 18, 24, 162 .....are in G.S. then common ratio r is:	{"1": "12", "2": "9", "3": "3", "4": "7"}	3
154	5	If 2Sin²θ + √3Cosθ + 1 = 0, then θ =	{"1": "150°", "2": "120°", "3": "180°", "4": "90°"}	1
155	5	Let F→R be defined by f(x) = Sin X and g→R be defined by g(x) = x², then g∘f(x) =	{"1": "Sin²x", "2": "2Sinx", "3": "Sinx²", "4": "2Cosx"}	1
156	5	If Cosθ + Secθ = 2, then the value of Sec⁷θ + Cos⁵θ =	{"1": "2", "2": "1", "3": "1/2", "4": "√3"}	2
157	5	If 4 Sin⁻¹x + Cos⁻¹x = π then the value of x is:	{"1": "1", "2": "√3/2", "3": "1/√2", "4": "1/2"}	4
158	5	Find dy/dx, If x = at², y = 2at.	{"1": "t", "2": "t/2", "3": "2/t", "4": "1/t²"}	3
159	5	Find the derivative of e^(2x+3)	{"1": "2e^(2x)", "2": "2e^(2x+3)", "3": "2e^2", "4": "2e^(2x+6)"}	2
160	5	For parallel or anti-parallel vectors θ is:	{"1": "0° or 90°", "2": "90° or 180°", "3": "0° or 180°", "4": "180° or 360°"}	3
161	5	If a⃗ = i⃗ + j⃗ - k⃗ and b⃗, c⃗ are any two vectors. Find the angle between two.	{"1": "π/3", "2": "π/4", "3": "π/2", "4": "none"}	4
162	5	For what value of k, 3x² - 4kxy + 5y² = 0 represents a pair of co-incident lines?	{"1": "±2/√15", "2": "±3/√15", "3": "±5/√15", "4": "±4/√15"}	1
163	5	The lines are real and distinct if:	{"1": "h² > ab", "2": "h² < ab", "3": "h² = ab", "4": "none"}	1
164	5	The value of k for which the equation 2x² - 7xy + 3y² - 5x - 5y + k = 0 represents a pair of straight lines?	{"1": "4", "2": "-3", "3": "2", "4": "6"}	1
165	5	If ax + by + c₁ = 0 and ax + by + c₂ = 0 are two parallel lines, then distance between them is:	{"1": "|c₁-c₂|/√(a²+b²)", "2": "|c₁-c₂|/√a²+b²", "3": "|c₁-c₂|/√(a+b)", "4": "none"}	1
166	5	The equation of tangent to circle x² + y² + 4x - 6y - 13 = 0 at point (3,4) is:	{"1": "3x + 4y = 17", "2": "2x - 7y = 9", "3": "5x + y = 19", "4": "5x + 3y = 1"}	1
167	5	The straight line (x + y + 1) + λ(2x - y - 1) = 0 is perpendicular to the line 2x + 3y - 8 = 0, then λ =	{"1": "7", "2": "-5", "3": "1", "4": "3"}	2
168	5	If a polygon has same number of diagonals as its sides, it is a:	{"1": "pentagon", "2": "Hexagon", "3": "Heptagon", "4": "Octagon"}	3
169	5	A certain pump can drain a fuel 375 gallon tank in 15 minutes. At this rate, how many more minutes would it take to drain a full 600 gallon tank?	{"1": "24", "2": "18", "3": "15", "4": "9"}	4
170	5	From 1985 to 1990, the berry production of bush x increased by 20%. From 1990 to 1995, it increased by 30%. What was percentage increased in berry production over the entire 10 years 1985 to 1995?	{"1": "50%", "2": "53%", "3": "56%", "4": "60%"}	3
171	5	If f(x) = x + 2 and g(x) = x³, then f∘g(1) is:	{"1": "2", "2": "3", "3": "1", "4": "4"}	2
172	5	A business man marked the selling price of an article 20% above the cost price. If he sells the article at 10% discount on marked price, find the profit percentage?	{"1": "8%", "2": "12%", "3": "10%", "4": "14%"}	1
173	5	A women is 6 years younger to her husband and he is 5 times as old as his daughter. If daughter was 7 years old two years back, what is the age of woman?	{"1": "39 years", "2": "45 years", "3": "50 years", "4": "35 years"}	1
174	5	∫7x³/² dx is:	{"1": "14x^(5/2) + c", "2": "14/5x^(5/2) + c", "3": "5/14x^(5/2) + c", "4": "7/2x^(5/2) + c"}	2
175	5	∫dx/x√(x²-1) is:	{"1": "log(√(x²-1)) + c", "2": "2x + c", "3": "2√(x²-1)", "4": "2x² + c"}	1
176	5	In a building with 10 floors, the number of rooms in each floor is R. If each room has C chairs, total chairs in building is:	{"1": "10R + C", "2": "10R + 10C", "3": "10RC", "4": "10/RC"}	3
177	5	Solve for x: x-√(x-1) = √(x-2)	{"1": "1/3", "2": "3", "3": "1/2", "4": "2"}	2
178	5	Area of triangle with sides x = 0, y = 0 and 4x + 5y = 20 is:	{"1": "20", "2": "10", "3": "5", "4": "1"}	2
179	6	His pocket has been picked. It means:	{"1": "Picked his been his pocket", "2": "They have his pocket picked.", "3": "Someone has picked his pocket.", "4": "Picking has been done to his pocket."}	3
180	6	More serious from the parent's point of view than the increasing expenditure on children's education is finding a good school. The more serious thing is:	{"1": "The parent's point of view", "2": "finding a good school", "3": "Children's education", "4": "increasing education"}	2
181	6	Here's my report ----- it at last.	{"1": "I finish", "2": "I finished", "3": "I've finished", "4": "I'm finished"}	3
182	6	Your parents are very upset with you and you are regretting over the wrong doing.	{"1": "I wish they would understand me", "2": "I wish I could tell them the truth", "3": "I wish I hadn't disobeyed them", "4": "I wish they were happy"}	3
183	6	He gave up ............	{"1": "Smoke", "2": "to smoke", "3": "Smoking", "4": "to smoke"}	3
184	6	The professor and psychologist......... come.	{"1": "has", "2": "have", "3": "has", "4": "was"}	2
185	6	Where's Robert? ........ a shower?	{"1": "Does he have", "2": "Has he", "3": "Has he got", "4": "Is he having"}	4
186	6	An Englishman killed his mother for trying to save an Indian's life. The person trying to save the Indian's life..........	{"1": "was an English woman", "2": "was saved", "3": "was Killed", "4": "was an Indian"}	1
187	6	I didn't use to smoke in the past but these days I'm used to.......	{"1": "Smoke", "2": "smokes", "3": "Smoked", "4": "smoking"}	4
188	6	Indirect speech of: She said. "Good bye, my friend."	{"1": "She told her friends good bye.", "2": "She bade good bye to her friends.", "3": "She shouted good bye to her friends.", "4": "She shouted good bye to her friends."}	2
189	6	Fate smiles...... him in all his ventures.	{"1": "upon", "2": "at", "3": "with", "4": "for"}	1
190	6	The downfall of this dictatorial regime is ...	{"1": "imminent", "2": "eminent", "3": "urgent", "4": "optional"}	1
191	6	Unexpected change in somebody's fortune is called:	{"1": "Vicissitude", "2": "Verisimilitude", "3": "Fortunate", "4": "Catastrophe"}	1
192	6	It's time to take tea. It means .............	{"1": "tea should be taken", "2": "tea is to be taken", "3": "it's time for tea to be taken", "4": "tea should be taken now"}	4
193	6	When I looked round the door, the baby ......... quietly.	{"1": "is sleeping", "2": "slept", "3": "was sleeping", "4": "were sleeping"}	3
194	6	......... a party next Friday. We've sent out the invitations.	{"1": "We had", "2": "We have", "3": "We'll have", "4": "We are having"}	4
195	6	By 2020, I..... Bachelor's in science.	{"1": "complete", "2": "am completing", "3": "will complete", "4": "will have completed"}	4
196	6	Julia was out of breath because .........	{"1": "she had been running", "2": "She did run", "3": "she's been running", "4": "she's run"}	1
197	6	This house is ...of the two.	{"1": "the best", "2": "the better that", "3": "the better", "4": "better"}	3
198	6	At this time tomorrow....... Over the Pacific Ocean.	{"1": "we flying", "2": "we'll fly", "3": "we'll be flying", "4": "we to fly"}	3
199	7	What is the brain of a computer?	{"1": "RAM", "2": "CPU", "3": "Hard Disk", "4": "Monitor"}	2
112	2	Who discovered electron?	{"1": "Thomson", "2": "Goldstein", "3": "Rutherford", "4": "Chadwick"}	1
113	2	Which of the following is called red planet?	{"1": "Venus", "2": "Mercury", "3": "Mars", "4": "Jupiter"}	3
114	2	The waste material present in an ore is called:	{"1": "Flux", "2": "Alloy", "3": "Gangue", "4": "Slag"}	3
115	2	Vapour density of a gas is 22. Its molecular weight will be:	{"1": "33", "2": "22", "3": "44", "4": "11"}	3
116	2	If 30g of Mg and 30g of O2 are reacted, then the residual mixture contains:	{"1": "40g MgO + 20g O2", "2": "45g MgO + 15g O2", "3": "50g MgO + 10g O2", "4": "60g MgO only"}	3
117	2	Which of the following set of quantum number is not possible?	{"1": "n = 2, l = 1, m = 0, s = +1/2", "2": "n = 2, l = 2, m = +1, s = -1/2", "3": "n = 2, l = 1, m = -1, s = +1/2", "4": "n = 2, l = 1, m = 0, s = -1/2"}	2
118	2	Radioactivity was discovered by:	{"1": "Henry Becquerel", "2": "Rutherford", "3": "J.J Thompson", "4": "Madam Curie"}	1
119	2	Which of the following expression at pressure represents Charles' law?	{"1": "V α 1/T", "2": "V α 1/T²", "3": "V α T", "4": "V = d"}	3
120	2	Solid CO2 is an example of:	{"1": "Ionic crystal", "2": "Covalent crystal", "3": "Metallic crystal", "4": "Molecular crystal"}	4
121	2	Which bond has maximum M.P. and B.P?	{"1": "Ionic", "2": "Covalent", "3": "CO-ordinate covalent", "4": "Hydrogen bond"}	1
122	2	The atomic no. of an element is 38. In which block does it lie?	{"1": "s-block", "2": "p-block", "3": "d-block", "4": "f-block"}	1
123	2	During fermentation of glucose the enzyme used is:	{"1": "Zymase", "2": "Lipase", "3": "Invertase", "4": "Amylase"}	1
124	2	What is the empirical formula of a hydrocarbon containing 75% carbon?	{"1": "C2H4", "2": "CH4", "3": "C3H9", "4": "C2H6"}	2
125	2	Example of amphoteric oxide is:	{"1": "SO2", "2": "Na2O", "3": "ZnO", "4": "NO"}	3
126	2	Colour pigments can be separated by:	{"1": "Filtration", "2": "Distillation", "3": "Chromatography", "4": "Sublimation"}	3
127	2	Which one is manufactured from sea weeds?	{"1": "F2", "2": "I2", "3": "Cl2", "4": "Br2"}	2
128	2	The gas used in welding of iron or steel is:	{"1": "Methane", "2": "Ethane", "3": "Ethylene", "4": "Acetylene"}	4
200	10	Which planet is known as the Red Planet?	{"1": "Earth", "2": "Mars", "3": "Jupiter", "4": "Venus"}	2
201	10	Who wrote the national anthem of India?	{"1": "Rabindranath Tagore", "2": "Mahatma Gandhi", "3": "Jawaharlal Nehru", "4": "Subhash Chandra Bose"}	1
202	10	What is the capital city of Nepal?	{"1": "Pokhara", "2": "Kathmandu", "3": "Lalitpur", "4": "Bhaktapur"}	2
203	10	Which gas is essential for us to breathe?	{"1": "Carbon Dioxide", "2": "Hydrogen", "3": "Oxygen", "4": "Nitrogen"}	3
204	10	Who was the first man to walk on the Moon?	{"1": "Neil Armstrong", "2": "Yuri Gagarin", "3": "Buzz Aldrin", "4": "Michael Collins"}	1
205	10	What is the largest mammal in the world?	{"1": "Elephant", "2": "Blue Whale", "3": "Giraffe", "4": "Hippopotamus"}	2
206	10	In which continent is the Sahara Desert located?	{"1": "Asia", "2": "Africa", "3": "Australia", "4": "South America"}	2
207	10	Who is the current Secretary-General of the United Nations (as of 2024)?	{"1": "Ban Ki-moon", "2": "Antonio Guterres", "3": "Kofi Annan", "4": "Tedros Adhanom"}	2
208	10	Which country is known as the Land of the Rising Sun?	{"1": "China", "2": "Nepal", "3": "Japan", "4": "Thailand"}	3
209	10	What is the smallest prime number?	{"1": "0", "2": "1", "3": "2", "4": "3"}	3
210	10	Which organ purifies our blood?	{"1": "Lungs", "2": "Heart", "3": "Kidney", "4": "Liver"}	3
211	10	What is the boiling point of water in Celsius?	{"1": "100", "2": "0", "3": "50", "4": "120"}	1
212	10	Which festival is known as the festival of lights?	{"1": "Holi", "2": "Diwali", "3": "Eid", "4": "Christmas"}	2
213	10	Who discovered gravity?	{"1": "Einstein", "2": "Galileo", "3": "Newton", "4": "Faraday"}	3
214	10	How many continents are there?	{"1": "5", "2": "6", "3": "7", "4": "8"}	3
215	10	Which bird is known for its mimicry of human speech?	{"1": "Crow", "2": "Sparrow", "3": "Parrot", "4": "Peacock"}	3
216	10	Which metal is liquid at room temperature?	{"1": "Iron", "2": "Mercury", "3": "Gold", "4": "Silver"}	2
217	10	What color do you get when you mix red and blue?	{"1": "Green", "2": "Purple", "3": "Brown", "4": "Pink"}	2
218	10	Which vitamin is known as the sunshine vitamin?	{"1": "Vitamin A", "2": "Vitamin C", "3": "Vitamin D", "4": "Vitamin B"}	3
219	10	Which is the largest ocean in the world?	{"1": "Atlantic Ocean", "2": "Indian Ocean", "3": "Arctic Ocean", "4": "Pacific Ocean"}	4
\.


--
-- Data for Name: mock_tests; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.mock_tests (id, stream_id, title, time_limit, question_count) FROM stdin;
1	1	Digital Logic	10	10
2	1	C Programming	10	10
3	1	Mathematics I	10	10
4	2	Computer Science	75	100
5	2	Biology	75	100
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.notifications (id, user_id, actor_id, message, type, meta, is_read, created_at) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.reviews (id, user_id, mock_test_id, review, rating, created_at) FROM stdin;
21	1	1	Good.	2	2025-05-27 17:50:02.683377+00
22	2	1	Decent mock test.	1.5	2025-05-27 17:50:02.683377+00
23	8	1	Pretty decent mock test, learned some good stuff.	3	2025-05-27 17:50:02.683377+00
24	14	1	Solid set of questions, nice balance overall.	2.5	2025-05-27 17:50:02.683377+00
25	3	1	This mock test had a great range of questions, and it helped me identify some weaknesses.	1	2025-05-27 17:50:02.683377+00
26	8	1	Nice challenge with a good mix of question types.	2.5	2025-05-27 17:50:02.683377+00
27	20	1	The test was tough in some parts but I managed to learn a lot.	4	2025-05-27 17:50:02.683377+00
28	5	1	Well-structured test with clear explanations, definitely boosted my confidence.	3	2025-05-27 17:50:02.683377+00
29	9	1	Really enjoyed this mock test! Covered most key concepts in detail.	1.5	2025-05-27 17:50:02.683377+00
30	5	1	I found the mock test to be well-balanced and realistic. It was challenging but fair, and it really boosted my confidence for the real exam.	2.5	2025-05-27 17:50:02.683377+00
31	19	1	This was an excellent mock test! It covered all the key topics comprehensively and included a mix of easy, medium, and difficult questions. The explanations for each answer were detailed and extremely helpful, making it a valuable resource for my exam preparation.	4.5	2025-05-27 17:50:02.683377+00
32	5	1	I highly recommend this mock test to anyone preparing for the exam. It was thorough, challenging, and provided great explanations for every answer, making it one of the best resources I've used so far.	3.5	2025-05-27 17:50:02.683377+00
\.


--
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.sections (id, name, question_weight, marks_per_question, negative_marking) FROM stdin;
1	Main	1	1	0
2	Chemistry	0.2	1	0
3	Biology	0.2	1	0
4	Physics	0.2	1	0
5	Mathematics	0.2	1	0
6	English	0.1	1	0
7	Computer Science	0.2	1	0
10	Genaral Knowledge	0.1	1	0
8	Main	1	1	0
9	Main	1	1	0
\.


--
-- Data for Name: streams; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.streams (id, name) FROM stdin;
1	BCA
2	+2 Entrance
\.


--
-- Data for Name: test_section_links; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.test_section_links (mock_test_id, section_id) FROM stdin;
1	1
2	8
3	9
4	2
4	4
4	5
4	6
4	7
4	10
5	2
5	3
5	10
\.


--
-- Data for Name: user_scores; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.user_scores (id, user_id, mock_test_id, score, question_count, full_marks, time_limit, section_scores, unanswered_questions, elapsed_time, created_at) FROM stdin;
1	69	5	5	10	10	10	{}	0	236	2025-05-27 11:31:22.268+00
587	69	1	7	10	10	10	{}	0	387	2025-05-29 01:23:40.611+00
588	69	1	7	10	10	10	{}	0	294	2025-05-27 20:27:27.146+00
589	69	1	6	10	10	10	{}	0	532	2025-05-29 00:40:54.677+00
590	69	1	9	10	10	10	{}	0	381	2025-05-28 15:26:23.246+00
591	69	1	6	10	10	10	{}	0	480	2025-05-30 02:15:42.306+00
592	69	1	1	10	10	10	{}	0	256	2025-05-26 01:14:08.319+00
593	69	1	3	10	10	10	{}	0	295	2025-05-27 06:22:30.997+00
594	69	1	10	10	10	10	{}	0	324	2025-05-29 13:02:28.386+00
595	69	1	8	10	10	10	{}	0	201	2025-05-26 07:28:09.182+00
596	69	1	4	10	10	10	{}	0	269	2025-05-27 18:34:57.744+00
597	69	1	8	10	10	10	{}	0	453	2025-05-30 17:18:31.968+00
598	69	1	5	10	10	10	{}	0	566	2025-05-28 08:25:49.098+00
599	69	1	5	10	10	10	{}	0	424	2025-05-27 00:49:46.647+00
600	69	1	8	10	10	10	{}	0	504	2025-05-26 23:57:53.518+00
601	69	1	7	10	10	10	{}	0	458	2025-05-27 21:05:41.012+00
602	69	1	10	10	10	10	{}	0	381	2025-05-26 07:19:44.105+00
603	69	1	10	10	10	10	{}	0	224	2025-06-01 07:44:39.978+00
604	69	1	1	10	10	10	{}	0	436	2025-06-01 02:24:44.322+00
605	69	1	10	10	10	10	{}	0	591	2025-05-26 22:33:33.519+00
606	69	1	2	10	10	10	{}	0	290	2025-05-28 14:54:52.478+00
607	69	1	3	10	10	10	{}	0	327	2025-05-29 02:42:40.949+00
608	69	1	3	10	10	10	{}	0	520	2025-05-26 17:17:42.843+00
609	69	1	10	10	10	10	{}	0	484	2025-05-29 15:46:30.15+00
610	69	1	8	10	10	10	{}	0	274	2025-05-26 16:19:15.228+00
611	69	1	1	10	10	10	{}	0	493	2025-05-31 18:19:46.856+00
612	69	1	2	10	10	10	{}	0	398	2025-05-25 16:55:22.103+00
613	69	1	4	10	10	10	{}	0	516	2025-05-29 10:40:28.732+00
614	69	1	1	10	10	10	{}	0	332	2025-05-31 01:17:05.056+00
615	69	1	9	10	10	10	{}	0	244	2025-05-30 05:18:21.068+00
616	69	1	5	10	10	10	{}	0	335	2025-05-26 22:10:38.462+00
617	69	1	10	10	10	10	{}	0	222	2025-05-31 21:51:25.582+00
618	69	1	9	10	10	10	{}	0	326	2025-05-28 05:08:47.283+00
619	69	1	3	10	10	10	{}	0	423	2025-05-26 19:10:05.921+00
620	69	1	1	10	10	10	{}	0	472	2025-05-26 12:28:54.815+00
621	69	1	8	10	10	10	{}	0	286	2025-05-29 21:49:42.859+00
622	69	1	1	10	10	10	{}	0	330	2025-05-26 06:00:24.047+00
623	69	1	7	10	10	10	{}	0	215	2025-05-31 14:48:34.267+00
624	69	1	1	10	10	10	{}	0	337	2025-05-29 18:31:19.797+00
625	69	1	2	10	10	10	{}	0	241	2025-05-28 06:27:49.133+00
626	69	1	2	10	10	10	{}	0	222	2025-05-31 08:15:44.674+00
627	69	1	9	10	10	10	{}	0	307	2025-05-29 10:35:12.229+00
628	69	1	10	10	10	10	{}	0	380	2025-05-26 21:16:49.83+00
629	69	1	8	10	10	10	{}	0	305	2025-05-31 00:31:56.053+00
630	69	1	7	10	10	10	{}	0	555	2025-05-25 22:28:52.724+00
631	69	1	5	10	10	10	{}	0	368	2025-05-27 20:56:04.917+00
632	69	1	9	10	10	10	{}	0	302	2025-05-28 05:39:50.697+00
633	69	1	7	10	10	10	{}	0	409	2025-05-27 17:20:21.175+00
634	69	1	2	10	10	10	{}	0	280	2025-05-31 14:52:04.285+00
635	69	1	3	10	10	10	{}	0	420	2025-06-01 00:04:48.597+00
636	69	1	1	10	10	10	{}	0	376	2025-06-01 05:50:44.721+00
\.


--
-- Data for Name: user_settings; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.user_settings (id, user_id, settings, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.users (id, name, email, password, number, bio, avatar, blob_name, oauth_provider, verified, created_at, updated_at) FROM stdin;
2	Ram Acharya	ram.acharya@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
3	Gita Sharma	gita.sharma@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
4	Hari Thapa	hari.thapa@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
5	Anita Bhandari	anita.bhandari@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
6	Bikash Neupane	bikash.neupane@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
7	Sarita Rai	sarita.rai@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
8	Nabin Shrestha	nabin.shrestha@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
9	Rita Lama	rita.lama@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
10	Kishor Dahal	kishor.dahal@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
11	Mina Magar	mina.magar@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
12	Rajendra Poudel	rajendra.poudel@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
13	Sabita Karki	sabita.karki@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
14	Bimal KC	bimal.kc@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
15	Sujata Maharjan	sujata.maharjan@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
16	Ramesh Kunwar	ramesh.kunwar@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
17	Manju Bhattarai	manju.bhattarai@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
18	Dipendra Rana	dipendra.rana@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
20	Arjun Giri	arjun.giri@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
21	Binita Rijal	binita.rijal@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
22	Sandeep KC	sandeep.kc@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
23	Kalpana Bhusal	kalpana.bhusal@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
29	Bijay Rauniyar	rauniyarbijay0@gmail.com	\N	\N	\N	\N	\N	google	t	2025-05-12 13:28:03.645+00	2025-05-12 13:28:03.645+00
24	Sunil Basnet	sunil.basnet@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
25	Pratiksha Shahi	pratiksha.shahi@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	\N	\N	\N	local	t	2025-05-06 13:06:38.009659+00	2025-05-06 13:06:38.009659+00
31	Vance West	bibefimiz@hey.com	$2a$10$VZ9SqWJIiSanDov5UAFHQ.FiRHoJpxK2qIPYWGJ1OxnWnfvJxkqui	9860000000	\N	bear	\N	local	f	2025-05-16 20:03:08.824+00	2025-05-16 20:03:08.824+00
19	Pabitra Khadka	pabitra.khadka@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	Full-time student, part-time procrastinator 😅✏️\r\nLearning today, leading tomorrow 🎓🚀	https://mocksewa.blob.core.windows.net/profile-pics/users/1747570690510-wallpaper.webp	users/1747570690510-wallpaper.webp	local	t	2025-05-06 13:06:38.009659+00	2025-05-18 18:45:14.651+00
69	Bijay Rauniyar	andreysandrey.10@gmail.com	$2a$10$0afjX69ZQSs32CEzlZe3C.nLee6MsCpcUjw877XJvwngAuJgSg8ge	9861842341	dsdsds	https://mocksewa.blob.core.windows.net/profile-pics/users/1748368658216-me.webp	users/1748368658216-me.webp	local	t	2025-05-17 09:14:20.106+00	2025-05-27 17:57:38.359+00
1	Sita Koirala	sita.koirala@example.com	$2a$10$sNW67ojdyWR5V.G/WAWn2euwYyjbLatQqwpCvZhXHwPKx0wFZpMT2	\N	I am a aspirant yoo	https://mocksewa.blob.core.windows.net/profile-pics/users/1748633715763-wallpaper.webp	users/1748633715763-wallpaper.webp	local	t	2025-05-06 13:06:38.009659+00	2025-05-30 19:35:15.897+00
\.


--
-- Name: bookmarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.bookmarks_id_seq', 27, true);


--
-- Name: discussions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.discussions_id_seq', 924, true);


--
-- Name: mcq_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.mcq_questions_id_seq', 219, true);


--
-- Name: mock_tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.mock_tests_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.reviews_id_seq', 32, true);


--
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.sections_id_seq', 1, false);


--
-- Name: streams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.streams_id_seq', 2, true);


--
-- Name: user_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.user_scores_id_seq', 636, true);


--
-- Name: user_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.user_settings_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.users_id_seq', 69, true);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (id);


--
-- Name: discussions discussions_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.discussions
    ADD CONSTRAINT discussions_pkey PRIMARY KEY (id);


--
-- Name: mcq_questions mcq_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions
    ADD CONSTRAINT mcq_questions_pkey PRIMARY KEY (id);


--
-- Name: mock_tests mock_tests_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mock_tests
    ADD CONSTRAINT mock_tests_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- Name: streams streams_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.streams
    ADD CONSTRAINT streams_pkey PRIMARY KEY (id);


--
-- Name: test_section_links test_section_links_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.test_section_links
    ADD CONSTRAINT test_section_links_pkey PRIMARY KEY (mock_test_id, section_id);


--
-- Name: user_scores user_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_scores
    ADD CONSTRAINT user_scores_pkey PRIMARY KEY (id);


--
-- Name: user_settings user_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT user_settings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: bookmarks bookmarks_mock_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_mock_test_id_fkey FOREIGN KEY (mock_test_id) REFERENCES public.mock_tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bookmarks bookmarks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: discussions discussions_mock_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.discussions
    ADD CONSTRAINT discussions_mock_test_id_fkey FOREIGN KEY (mock_test_id) REFERENCES public.mock_tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: discussions discussions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.discussions
    ADD CONSTRAINT discussions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mcq_questions mcq_questions_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions
    ADD CONSTRAINT mcq_questions_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mock_tests mock_tests_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mock_tests
    ADD CONSTRAINT mock_tests_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews reviews_mock_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_mock_test_id_fkey FOREIGN KEY (mock_test_id) REFERENCES public.mock_tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: test_section_links test_section_links_mock_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.test_section_links
    ADD CONSTRAINT test_section_links_mock_test_id_fkey FOREIGN KEY (mock_test_id) REFERENCES public.mock_tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: test_section_links test_section_links_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.test_section_links
    ADD CONSTRAINT test_section_links_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_scores user_scores_mock_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_scores
    ADD CONSTRAINT user_scores_mock_test_id_fkey FOREIGN KEY (mock_test_id) REFERENCES public.mock_tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_scores user_scores_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_scores
    ADD CONSTRAINT user_scores_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_settings user_settings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT user_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

