create table merchandise(
  id int auto_increment primary key ,
  openId varchar(60) not null,
  title varchar(50) not null,
  detail varchar(400) not null,
  price float not null,
  category varchar(20) not null,
  postTime varchar(40),
  image varchar(1000),
  viewCount int ,
  sold Boolean,
);

create table user(
  openId varchar(60) primary key,
  nickName varchar(100),
  avatarUrl varchar(300),
  favorites varchar(300),
  QQId varchar(90),
  phoneNumber varchar(20),
  major varchar(40)
)
