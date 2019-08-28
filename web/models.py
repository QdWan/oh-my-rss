from django.db import models


class Site(models.Model):
    """
    站点表
    """
    name = models.CharField('scrapy代号', max_length=100, unique=True, db_index=True)
    author = models.CharField('作者', max_length=100)
    cname = models.CharField('站点名称', max_length=100)
    link = models.CharField('站点主页', max_length=200)
    favicon = models.CharField('favicon', max_length=100, default='')
    brief = models.CharField('简介', max_length=200)
    star = models.IntegerField('评级，10，20，30', default=20)
    freq = models.CharField('更新频率', choices=(
        ('日更', '每天更新'),
        ('周更', '每周更新'),
        ('月更', '每月更新'),
    ), max_length=20)
    status = models.CharField('状态', max_length=20, choices=(
        ('active', '激活'),
        ('close', '关闭，下线'),
    ), default='active')
    copyright = models.IntegerField('版权', choices=(
        (0, '未知'),
        (10, '不可转载'),
        (20, '仅可转载摘要'),
        (30, '可以全文转载'),
    ), default=0, null=True)

    tag = models.CharField('一个词形容', choices=(
        ('前端', '前端'),
        ('客户端', '客户端'),
        ('后端', '后端'),
        ('全栈', '全栈'),
        ('产品', '产品'),
        ('营销', '营销'),
        ('安全', '安全'),
        ('设计', '设计'),
        ('测试', '测试'),
        ('运维', '运维'),
        ('刊物', '刊物'),
        ('算法', '算法'),
        ('大数据', '大数据'),
    ), max_length=20, null=True)

    ctime = models.DateTimeField('创建时间', auto_now_add=True)
    mtime = models.DateTimeField('更新时间', auto_now=True)
    remark = models.TextField('备注', default='', null=True)


class Article(models.Model):
    """
    文章表
    """
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    title = models.CharField('标题', max_length=200, unique=True)
    uindex = models.IntegerField('唯一地址', unique=True, db_index=True)
    content = models.TextField('内容')
    src_url = models.CharField('原始链接', max_length=500)
    status = models.CharField('状态', max_length=20, choices=(
        ('active', '激活'),
        ('close', '关闭，下线'),
    ), default='active')

    ctime = models.DateTimeField('创建时间', auto_now_add=True)
    mtime = models.DateTimeField('更新时间', auto_now=True)
    remark = models.TextField('备注', default='', null=True)


class Message(models.Model):
    """
    留言表
    """
    uid = models.CharField('用户id', max_length=100)
    content = models.TextField('内容')
    nickname = models.CharField('用户id', max_length=20, null=True)
    contact = models.CharField('用户id', max_length=50, null=True)

    status = models.CharField('状态', max_length=20, choices=(
        ('active', '激活'),
        ('close', '关闭，下线'),
    ), default='active')
    reply = models.TextField('回复', null=True)

    ctime = models.DateTimeField('创建时间', auto_now_add=True)
    mtime = models.DateTimeField('更新时间', auto_now=True)
    remark = models.TextField('备注', default='', null=True)
