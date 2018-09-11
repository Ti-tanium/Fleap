create table merchandise(
  id int auto_increment primary key ,
  title varchar(50) not null,
  detail varchar(400) not null,
  price float not null,
  picture varchar(1000),
  viewCount int ,
  sold boolean，
  major varchar(40),
  category varchar(20),
  properties varchar(10),

)