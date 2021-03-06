
CREATE TABLE post(
    id INT auto_increment NOT NULL   COMMENT 'ID' ,
    openId VARCHAR(32)    COMMENT 'openID' ,
    category INT    COMMENT '类别' ,
    price DECIMAL(32,8)    COMMENT '价格' ,
    images VARCHAR(3120)    COMMENT '图片URL' ,
    title VARCHAR(128)    COMMENT '发布标题' ,
    detail VARCHAR(1024)    COMMENT '发布详情' ,
    postTime VARCHAR(32)    COMMENT '发布时间' ,
    viewCount INT    COMMENT '浏览次数' ,
    sold VARCHAR(1)    COMMENT '是否售出' ,
    tag VARCHAR(32)    COMMENT '标签' ,
    textbookId VARCHAR(32)    COMMENT '教材ID' ,
    latitude DECIMAL(64,16)    COMMENT '维度' ,
    longitude DECIMAL(64,16)    COMMENT '经度' ,
    PRIMARY KEY (id)
) COMMENT = '发布信息 ' CHARSET=utf8;

CREATE TABLE user(
    openId VARCHAR(32) NOT NULL   COMMENT 'openId' ,
    nickname VARCHAR(32)    COMMENT '昵称' ,
    avatarUrl VARCHAR(128)    COMMENT '头像地址' ,
    major VARCHAR(32)    COMMENT '专业' ,
    phone VARCHAR(32)    COMMENT '手机号码' ,
    QQId VARCHAR(32)    COMMENT 'QQ' ,
    gender VARCHAR(1)    COMMENT '性别' ,
    PRIMARY KEY (openId)
) COMMENT = '用户 ' CHARSET=utf8;

CREATE TABLE major(
    id INT auto_increment NOT NULL   COMMENT '专业ID' ,
    name VARCHAR(32)    COMMENT '专业全称' ,
    PRIMARY KEY (id)
) COMMENT = '专业 ' CHARSET=utf8;


CREATE TABLE post_category(
    id INT auto_increment NOT NULL   COMMENT 'ID' ,
    name VARCHAR(32)    COMMENT '名称' ,
    code_name VARCHAR(32)    COMMENT '代码名' ,
    PRIMARY KEY (id)
) COMMENT = '发布信息种类 '  CHARSET=utf8;

insert into post_category(name,code_name) values ("教辅资料","textbook");
insert into post_category(name,code_name) values ("日常用品","dailyuse");
insert into post_category(name,code_name) values ("电子产品","electronics");
insert into post_category(name,code_name) values ("盆栽","plant");
insert into post_category(name,code_name) values ("服装","clothes");
insert into post_category(name,code_name) values ("拼车","carshare");
insert into post_category(name,code_name) values ("其他","other");

CREATE TABLE record(
    id INT auto_increment NOT NULL   COMMENT 'ID' ,
    type INT    COMMENT '类型' ,
    openId VARCHAR(1024)    COMMENT 'user' ,
    postId INT    COMMENT 'post' ,
    PRIMARY KEY (id)
) COMMENT = '行为记录 ' CHARSET=utf8;