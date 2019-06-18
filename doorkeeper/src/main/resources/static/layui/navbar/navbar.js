/**
 * navbar.js
 * @author 御风 <1945199284@qq.com>
 */
layui.define(['element', 'common'], function (exports) {
    "use strict";
    var $ = layui.jquery,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        element = layui.element,
        common = layui.common,
        cacheName = 'tb_navbar';

    var Navbar = function () {
        /**
         *  默认配置
         */
        this.config = {
            elem: undefined, //容器
            data: undefined, //数据源
            url: undefined, //数据源地址
            type: 'GET', //读取方式
            cached: false, //是否使用缓存
            spreadOne: false //设置是否只展开一个二级菜单
        };
        this.v = '1.0.0';
    };
    //渲染
    Navbar.prototype.render = function () {
        var _that = this;
        var _config = _that.config;
        if (typeof (_config.elem) !== 'string' && typeof (_config.elem) !== 'object') {
            common.throwError('Navbar error: elem参数未定义或设置出错，具体设置格式请参考文档API.');
        }
        var $container;
        if (typeof (_config.elem) === 'string') {
            $container = $('' + _config.elem + '');
        }
        if (typeof (_config.elem) === 'object') {
            $container = _config.elem;
        }
        if ($container.length === 0) {
            common.throwError('Navbar error:找不到elem参数配置的容器，请检查.');
        }
        if (_config.data === undefined && _config.url === undefined) {
            common.throwError('Navbar error:请为Navbar配置数据源.')
        }
        if (_config.data !== undefined && typeof (_config.data) === 'object') {
            var html = getHtml(_config.data);
            $container.html(html);
            element.init();
            _that.config.elem = $container;
        } else {
            if (_config.cached) {
                var cacheNavbar = layui.data(cacheName);
                if (cacheNavbar.navbar === undefined) {
                    $.ajax({
                        type: _config.type,
                        url: _config.url,
                        async: false, //_config.async,
                        dataType: 'json',
                        success: function (result, status, xhr) {
                            //添加缓存
                            layui.data(cacheName, {
                                key: 'navbar',
                                value: result
                            });
                            var html = getHtml(result);
                            $container.html(html);
                            element.init();
                        },
                        error: function (xhr, status, error) {
                            common.msgError('Navbar error:' + error);
                        },
                        complete: function (xhr, status) {
                            _that.config.elem = $container;
                        }
                    });
                } else {
                    var html = getHtml(cacheNavbar.navbar);
                    $container.html(html);
                    element.init();
                    _that.config.elem = $container;
                }
            } else {
                //清空缓存
                layui.data(cacheName, null);
                $.ajax({
                    type: _config.type,
                    url: _config.url,
                    async: false, //_config.async,
                    dataType: 'json',
                    success: function (result, status, xhr) {
                        var html = getHtml(result);
                        $container.html(html);
                        element.init();
                    },
                    error: function (xhr, status, error) {
                        common.msgError('Navbar error:' + error);
                    },
                    complete: function (xhr, status) {
                        _that.config.elem = $container;
                    }
                });
            }
        }

        //只展开一个二级菜单
        if (_config.spreadOne) {
            var $ul = $container.children('ul');
            $ul.find('li.layui-nav-item').each(function () {
                $(this).on('click', function () {
                    $(this).siblings().removeClass('layui-nav-itemed');
                });
            });
        }
        return _that;
    };
    /**
     * 配置Navbar
     * @param {Object} options
     */
    Navbar.prototype.set = function (options) {
        var that = this;
        that.config.data = undefined;
        $.extend(true, that.config, options);
        return that;
    };
    /**
     * 绑定事件
     * @param {String} events
     * @param {Function} callback
     */
    Navbar.prototype.on = function (events, callback) {
        var that = this;
        var _con = that.config.elem;
        if (typeof (events) !== 'string') {
            common.throwError('Navbar error:事件名配置出错，请参考API文档.');
        }
        var lIndex = events.indexOf('(');
        var eventName = events.substr(0, lIndex);
        var filter = events.substring(lIndex + 1, events.indexOf(')'));
        if (eventName === 'click') {
            if (_con.attr('lay-filter') !== undefined) {
                _con.children('ul').find('li').each(function () {
                    var $this = $(this);
                    if ($this.find('dl').length > 0) {
                        var $dd = $this.find('dd').each(function () {
                            $(this).on('click', function () {
                                var $a = $(this).children('a');
                                var href = $a.data('url');
                                var icon = $a.children('i:first').data('icon');
                                var title = $a.children('cite').text()
                                var data = {
                                    elem: $a,
                                    field: {
                                        href: href,
                                        icon: icon,
                                        title: title
                                    }
                                }




                                callback(data);
                            });
                        });
                    } else {
                        $this.on('click', function () {
                            // 配置tab实践在下面无法获取到菜单元素
                            $('.site-demo-active').on('click', function () {
                                var dataid = $(this);
                                //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
                                if ($(".layui-tab-title li[lay-id]").length <= 0) {
                                    //如果比零小，则直接打开新的tab项
                                    active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("data-title"));
                                } else {
                                    //否则判断该tab项是否以及存在
                                    var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
                                    $.each($(".layui-tab-title li[lay-id]"), function () {
                                        //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                                        if ($(this).attr("lay-id") == dataid.attr("data-id")) {
                                            isData = true;
                                        }
                                    })
                                    if (isData == false) {
                                        //标志为false 新增一个tab项
                                        active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"), dataid.attr("data-title"));
                                    }
                                }
                                //最后不管是否新增tab，最后都转到要打开的选项页面上
                                active.tabChange(dataid.attr("data-id"));
                            });

                            var active = {
                                //在这里给active绑定几项事件，后面可通过active调用这些事件
                                tabAdd: function (url, id, name) {
                                    //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
                                    //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
                                    element.tabAdd('mytabs', {
                                        title: name,
                                        content: '<iframe data-frameid="' + id + '" scrolling="auto" frameborder="0" src="' + url + '" style="width:100%;height:99%;"></iframe>',
                                        id: id //规定好的id
                                    })
                                    FrameWH();  //计算ifram层的大小
                                },
                                tabChange: function (id) {
                                    //切换到指定Tab项
                                    element.tabChange('mytabs', id); //根据传入的id传入到指定的tab项
                                },
                                tabDelete: function (id) {
                                    element.tabDelete("mytabs", id);//删除
                                }
                            };
                            function FrameWH() {
                                var h = $(window).height();
                                $("iframe").css("height",h+"px");
                            }
                        });
                    }
                });
            }
        }
    };
    /**
     * 清除缓存
     */
    Navbar.prototype.cleanCached = function () {
        layui.data(cacheName, null);
    };
    /**
     * 获取html字符串
     * @param {Object} data
     */
    function getHtml(data) {
        //初始化的容器
        var ulHtml = '<ul class="layui-nav layui-nav-tree" lay-filter="left">';

        for (var i = 0; i < data.length; i++) {

            //默认是否打开
            if (data[i].spread) {
                ulHtml += '<li class="layui-nav-item layui-nav-itemed">';
            } else {
                ulHtml += '<li class="layui-nav-item">';
            }

            if (data[i].children !== undefined && data[i].children !== null && data[i].children.length > 0) {
                ulHtml += '<a href="javascript:;">' + data[i].title;
                ulHtml += '<span class="layui-nav-more"></span>';
                ulHtml += '</a>';
                ulHtml += '<dl class="layui-nav-child">';
                //二级菜单
                for (var j = 0; j < data[i].children.length; j++) {
                     ulHtml += '<dd>';
                     ulHtml += '<a href="javascript:;"data-url="'+data[i].children[j].href+'" data-id="'+data[i].children[j].id+'" data-title="'+data[i].children[j].title+'" class="site-demo-active" data-type="tabAdd">' + data[i].children[j].title;
                     ulHtml += '</a>';
                     ulHtml += '</dd>';
                }
                ulHtml += '</dl>';
            } else {
                var dataUrl = (data[i].href !== undefined && data[i].href !== '') ? 'data-url="' + data[i].href + '"' : '';
                //ulHtml += '<a href="javascript:;" ' + dataUrl + '>';
                ulHtml += '<a href="' + data[i].href + '"' + dataUrl + '>';
                if (data[i].icon !== undefined && data[i].icon !== '') {
                    if (data[i].icon.indexOf('fa-') !== -1) {
                        ulHtml += '<i class="fa ' + data[i].icon + '" aria-hidden="true" data-icon="' + data[i].icon + '"></i>';
                    } else {
                        ulHtml += '<i class="layui-icon" data-icon="' + data[i].icon + '">' + data[i].icon + '</i>';
                    }
                }
                ulHtml += '<cite>' + data[i].title + '</cite>';
                ulHtml += '</a>';
            }
            ulHtml += '</li>';
        }
        ulHtml += '</ul>';

        return ulHtml;

    }

    var navbar = new Navbar();
    exports('navbar', function (options) {
        return navbar.set(options);
    });
});
