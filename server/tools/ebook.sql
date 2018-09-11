create table merchandise(
  id int auto_increment primary key ,
  openId varchar(60) not null,
  avatarUrl varchar(300),
  nickName varchar(100),
  title varchar(50) not null,
  detail varchar(400) not null,
  price float not null,
  category varchar(20) not null,
  image varchar(1000),
  viewCount int ,
  sold Boolean,
  major varchar(40)
);