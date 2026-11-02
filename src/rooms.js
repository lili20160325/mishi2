/*ROOMS-START*/
(function(G){
'use strict';
function R(x,y,w,h,f,rx,ex){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+f+'"'+(rx?' rx="'+rx+'"':'')+(ex||'')+'/>';}
function T(x,y,s,ch,ex){return '<text x="'+x+'" y="'+y+'" font-size="'+s+'" text-anchor="middle" dominant-baseline="central"'+(ex||'')+'>'+ch+'</text>';}
function P(d,f,ex){return '<path d="'+d+'" fill="'+f+'"'+(ex||'')+'/>';}
function C(x,y,r,f,ex){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+f+'"'+(ex||'')+'/>';}
var SK=' stroke="#1a2744" stroke-width="2.5" stroke-linejoin="round"';
function g(id,inner){return '<g class="obj" data-obj="'+id+'">'+inner+'</g>';}
G._R=R;G._T=T;G._P=P;G._C=C;G._SK=SK;G._g=g;
var ITEMS={
  "torch": {
    "name": "手电筒",
    "icon": "🔦",
    "desc": "没电的手电筒。"
  },
  "battery": {
    "name": "电池",
    "icon": "🔋",
    "desc": "两节备用电池。"
  },
  "torch_on": {
    "name": "亮着手电筒",
    "icon": "🔦",
    "glow": 1,
    "desc": "能照亮黑暗角落。"
  },
  "star_chip": {
    "name": "星图芯片",
    "icon": "💠",
    "glow": 1,
    "desc": "走廊门禁芯片。"
  },
  "moon_lens": {
    "name": "月相透镜",
    "icon": "🔎",
    "desc": "能对准月相盘的透镜。"
  },
  "planet_tag": {
    "name": "行星铭牌",
    "icon": "🪐",
    "desc": "写着「第三颗」的铭牌。"
  },
  "glue": {
    "name": "固体胶",
    "icon": "🧴",
    "desc": "可以把纸片粘牢。"
  },
  "map_a": {
    "name": "星图左半",
    "icon": "🗺️",
    "desc": "星图残片左半。"
  },
  "map_b": {
    "name": "星图右半",
    "icon": "🗾",
    "desc": "星图残片右半。"
  },
  "map_ab": {
    "name": "未粘牢星图",
    "icon": "🧾",
    "desc": "对上了但还没粘牢。"
  },
  "map_full": {
    "name": "完整星图",
    "icon": "🗺️",
    "glow": 1,
    "desc": "标出月球展厅位置。"
  },
  "magnet": {
    "name": "小磁铁",
    "icon": "🧲",
    "desc": "能吸起金属碎片。"
  },
  "shard": {
    "name": "金属碎片",
    "icon": "🔩",
    "desc": "写着半串数字。"
  },
  "fuse": {
    "name": "保险丝",
    "icon": "🔌",
    "desc": "控制室电闸用。"
  },
  "tape": {
    "name": "录音带",
    "icon": "📼",
    "desc": "内侧有英文提示。"
  },
  "cab_key": {
    "name": "小钥匙",
    "icon": "🔑",
    "desc": "副锁钥匙。"
  },
  "radio_pass": {
    "name": "放映厅证",
    "icon": "🎫",
    "glow": 1,
    "desc": "通往放映厅。"
  },
  "office_key": {
    "name": "馆长室钥匙",
    "icon": "🗝️",
    "glow": 1,
    "desc": "圆顶/馆长相关钥匙。"
  },
  "truth_note": {
    "name": "白墨的信",
    "icon": "✉️",
    "desc": "揭开真相的信。"
  },
  "master_key": {
    "name": "潮汐门钥匙",
    "icon": "🔑",
    "glow": 1,
    "desc": "最终的出门钥匙。"
  },
  "code_slip": {
    "name": "出门密码条",
    "icon": "📝",
    "desc": "上面有后两位线索。"
  },
  "lens_clip": {
    "name": "夹灯电池",
    "icon": "🔋",
    "desc": "给小夹灯供电。"
  },
  "clip_lamp": {
    "name": "小夹灯",
    "icon": "💡",
    "desc": "没电的小夹灯。"
  },
  "clip_on": {
    "name": "亮着夹灯",
    "icon": "💡",
    "glow": 1,
    "desc": "能照展柜暗格。"
  },
  "meteor_card": {
    "name": "陨石卡",
    "icon": "💳",
    "glow": 1,
    "desc": "标本室门禁卡。"
  },
  "dome_pass": {
    "name": "控制室通行证",
    "icon": "🛂",
    "glow": 1,
    "desc": "通往控制室。"
  },
  "star_key1": {
    "name": "星钥·青",
    "icon": "🔑",
    "glow": 1,
    "desc": "四枚星钥之一。"
  },
  "star_key4": {
    "name": "星钥·金",
    "icon": "🔑",
    "glow": 1,
    "desc": "四枚星钥之一。"
  }
};
G.PZ_ITEMS=ITEMS;
var ROOMS=[];
ROOMS.push({
  "id": "r1",
  "title": "闭馆大厅",
  "emoji": "🌌",
  "sub": "序章 · 卷帘落下",
  "story": [
    "周末的「星钥天文馆」家庭日结束了。你回展厅找掉在饮水机旁的水杯。",
    "广播里刚说“请从正门离馆”——“咔哒”，大厅卷帘门落下，应急灯忽明忽暗。",
    "告示牌旁贴着一张发黄便签：「别慌。跟我当年一样，集齐线索，潮汐门会开。——白墨」",
    "白墨是谁？先在大厅里找找能用的东西。"
  ],
  "objects": [
    {
      "id": "shutter",
      "name": "卷帘门",
      "box": [
        20,
        40,
        90,
        160
      ],
      "views": [
        {
          "text": "沉重的金属卷帘锁死了。缝隙外只剩停车场的夜灯。现在出不去。"
        }
      ]
    },
    {
      "id": "board",
      "name": "闭馆告示",
      "box": [
        130,
        24,
        120,
        70
      ],
      "views": [
        {
          "text": "闭馆须知被荧光笔圈过几处。右下角另有一行小字：",
          "note": "闭馆后请：关掉展柜灯、收好背包、走应急通道。\n\n【英语·填空】Please _____ the lights before you leave.\n（关灯，5 字母）\n——这题像是后面房间的伏笔，大厅门锁不需要它。"
        }
      ]
    },
    {
      "id": "desk",
      "name": "服务台抽屉",
      "box": [
        40,
        160,
        120,
        70
      ],
      "views": [
        {
          "if": [
            "!desk_open"
          ],
          "text": "服务台抽屉上着密码锁。收据夹在缝里：",
          "note": "【算一算】纪念品商店：星空贴纸原价 15.6 元，打八折后是多少？\n15.6 × 0.8 = ?",
          "lock": {
            "kind": "num",
            "len": 4,
            "dot": true,
            "answer": "12.48",
            "prompt": "输入折后价",
            "ok": {
              "set": [
                "desk_open"
              ],
              "text": "咔哒！抽屉开了，里面有一个没电的手电筒。"
            },
            "bad": "打八折就是乘 0.8。"
          }
        },
        {
          "if": [
            "desk_open",
            "!took_torch"
          ],
          "text": "抽屉里有一个手电筒。",
          "take": {
            "give": [
              "torch"
            ],
            "set": [
              "took_torch"
            ],
            "text": "你拿起手电筒，按了按——不亮，没有电池。"
          }
        },
        {
          "text": "抽屉已经空了。"
        }
      ]
    },
    {
      "id": "bench",
      "name": "休息长椅",
      "box": [
        180,
        220,
        140,
        40
      ],
      "views": [
        {
          "if": [
            "!took_bat"
          ],
          "text": "长椅坐垫一角鼓起来。",
          "take": {
            "give": [
              "battery"
            ],
            "set": [
              "took_bat"
            ],
            "text": "垫子下藏着两节电池！"
          }
        },
        {
          "text": "长椅下什么也没有了。"
        }
      ]
    },
    {
      "id": "shelf",
      "name": "昏暗置物架",
      "box": [
        300,
        50,
        80,
        150
      ],
      "views": [
        {
          "if": [
            "!shelf_lit"
          ],
          "text": "置物架最下层黑乎乎的。",
          "use": [
            {
              "item": "torch_on",
              "set": [
                "shelf_lit"
              ],
              "text": "手电筒一照——角落里有一个深蓝小铁盒！"
            }
          ],
          "wrong": "太黑了，得先有亮光。"
        },
        {
          "if": [
            "shelf_lit",
            "!box_open"
          ],
          "text": "深蓝小铁盒上有汉字转盘。盒盖内侧贴着词语表残页：",
          "note": "【成语填空】五 颜 六 ___\n（形容色彩很多）",
          "lock": {
            "kind": "dial",
            "opts": [
              [
                "色",
                "彩",
                "红",
                "光",
                "花",
                "亮"
              ]
            ],
            "answer": "色",
            "prompt": "转到缺的那个字",
            "ok": {
              "set": [
                "box_open"
              ],
              "give": [
                "star_chip"
              ],
              "text": "“色”！盒子打开，里面是一枚星图芯片，便签写着：“下一站：星图走廊。——白墨”"
            },
            "bad": "再想想这个成语。"
          }
        },
        {
          "if": [
            "box_open"
          ],
          "text": "铁盒空了。芯片你已经拿走。"
        }
      ]
    },
    {
      "id": "exit",
      "name": "星图走廊门",
      "box": [
        250,
        180,
        70,
        90
      ],
      "views": [
        {
          "if": [
            "!chip_used"
          ],
          "text": "门上有感应区，写着「请刷星图芯片」。",
          "use": [
            {
              "item": "star_chip",
              "set": [
                "chip_used"
              ],
              "win": true,
              "text": "芯片一刷——绿灯亮起。门开了，走廊里星点灯带亮起来。你握紧水杯：白墨的线索才刚开始。"
            }
          ],
          "wrong": "需要星图芯片。"
        },
        {
          "text": "门已经开了。"
        }
      ]
    }
  ],
  "combos": [
    {
      "a": "torch",
      "b": "battery",
      "give": [
        "torch_on"
      ],
      "set": [
        "torch_ready"
      ],
      "text": "你把电池装进手电筒——亮了！"
    }
  ],
  "hints": [
    {
      "until": "desk_open",
      "obj": "desk",
      "tiers": [
        "先看服务台抽屉缝里的收据。",
        "15.6 × 0.8。",
        "12.48。"
      ]
    },
    {
      "until": "took_torch",
      "obj": "desk",
      "tiers": [
        "抽屉开了，拿手电筒。",
        "点抽屉。",
        "拿起。"
      ]
    },
    {
      "until": "took_bat",
      "obj": "bench",
      "tiers": [
        "长椅下有东西。",
        "点休息长椅。",
        "拿起电池。"
      ]
    },
    {
      "until": "torch_ready",
      "obj": "bench",
      "tiers": [
        "手电筒和电池可以组合。",
        "物品栏里先后点两样。",
        "亮着手电筒出现了。"
      ]
    },
    {
      "until": "shelf_lit",
      "obj": "shelf",
      "tiers": [
        "用亮着手电筒照置物架。",
        "先选中手电筒，再点架子。",
        "出现铁盒。"
      ]
    },
    {
      "until": "box_open",
      "obj": "shelf",
      "tiers": [
        "铁盒是成语锁。",
        "五颜六___。",
        "色。"
      ]
    },
    {
      "until": "escaped",
      "obj": "exit",
      "tiers": [
        "用星图芯片刷走廊门。",
        "选中芯片点门。",
        "门开！"
      ]
    }
  ],
  "explain": [
    "15.6×0.8=12.48 开抽屉拿手电筒。",
    "长椅下拿电池，与手电筒组合点亮。",
    "照亮置物架，「五颜六色」开铁盒得芯片。",
    "刷芯片进入星图走廊。"
  ],
  "solution": [
    [
      "code",
      "desk",
      "12.48"
    ],
    [
      "take",
      "desk"
    ],
    [
      "take",
      "bench"
    ],
    [
      "combine",
      "torch",
      "battery"
    ],
    [
      "use",
      "shelf",
      "torch_on"
    ],
    [
      "code",
      "shelf",
      "色"
    ],
    [
      "use",
      "exit",
      "star_chip"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#0b1a33')+R(0,210,400,90,'#1a2740');
s+=C(320,50,18,'#ffe9a8')+C(60,40,3,'#fff')+C(100,70,2,'#dde')+C(200,30,2,'#fff');
s+=g('shutter',R(20,40,90,160,'#3a4a66',4,SK)+R(30,50,70,20,'#2a3548')+R(30,80,70,20,'#2a3548')+R(30,110,70,20,'#2a3548')+T(65,220,11,'卷帘',' fill="#9ab"'));
s+=g('board',R(130,24,120,70,'#f4efe0',6,SK)+T(190,55,12,'闭馆告示',' fill="#3a2a1a"'));
s+=g('desk',R(40,160,120,70,'#5a6a88',8,SK)+(f.desk_open?R(50,170,100,40,'#7a8aa8',4):'')+T(100,245,11,'服务台',' fill="#9ab"'));
s+=g('bench',R(180,220,140,40,'#6a7a55',8,SK)+T(250,275,11,'长椅',' fill="#9ab"'));
s+=g('shelf',R(300,50,80,150,f.shelf_lit?'#4a5a40':'#222838',6,SK)+T(340,220,11,'置物架',' fill="#9ab"'));
s+=g('exit',R(250,180,70,90,f.chip_used?'#2a6a4a':'#334',8,SK)+T(285,275,11,'走廊门',' fill="#9ab"'));
return s;}
});
ROOMS.push({
  "id": "r2",
  "title": "星图走廊",
  "emoji": "✨",
  "sub": "第一章 · 星点灯带",
  "story": [
    "走廊两侧是巨大的星图壁画。灯带像银河一样延伸。",
    "尽头的月球展厅门锁着。墙上有白墨的第二张便签：「星点会说话，但别被假的那颗骗了。」",
    "找齐线索，打开月球展厅的门。"
  ],
  "objects": [
    {
      "id": "mural",
      "name": "星图壁画",
      "box": [
        20,
        30,
        160,
        140
      ],
      "views": [
        {
          "text": "壁画上画着北斗七星。其中一颗被红笔圈过，旁注：",
          "note": "【干扰】旁边还写着「北极星永远最亮」——但红圈圈的是「天枢」，不是北极星。\n真线索在灯带控制盒上。"
        }
      ]
    },
    {
      "id": "panel",
      "name": "灯带控制盒",
      "box": [
        200,
        40,
        100,
        80
      ],
      "views": [
        {
          "if": [
            "!panel_open"
          ],
          "text": "控制盒有数字锁。盒盖贴纸：",
          "note": "【算一算】走廊有 4 段灯带，每段 3.5 米，一共多少米？\n4 × 3.5 = ?",
          "lock": {
            "kind": "num",
            "len": 2,
            "dot": true,
            "answer": "14",
            "prompt": "输入总长度",
            "ok": {
              "set": [
                "panel_open"
              ],
              "text": "14！盒盖弹开，里面有一片月相透镜，还有半张星图残片。"
            },
            "bad": "4 段，每段 3.5。"
          }
        },
        {
          "if": [
            "panel_open",
            "!took_lens"
          ],
          "text": "盒子里有月相透镜和星图左半。",
          "take": {
            "give": [
              "moon_lens",
              "map_a"
            ],
            "set": [
              "took_lens"
            ],
            "text": "你拿走透镜和星图左半。"
          }
        },
        {
          "text": "控制盒空了。"
        }
      ]
    },
    {
      "id": "poster",
      "name": "志愿者海报",
      "box": [
        310,
        30,
        70,
        100
      ],
      "views": [
        {
          "if": [
            "!took_mapb"
          ],
          "text": "旧海报一角翘起。",
          "take": {
            "give": [
              "map_b"
            ],
            "set": [
              "took_mapb"
            ],
            "text": "海报后面藏着星图右半！"
          }
        },
        {
          "text": "海报后空空的。背面用铅笔写着：「白墨 · 2018 志愿者」。"
        }
      ]
    },
    {
      "id": "gluebox",
      "name": "保洁推车",
      "box": [
        30,
        200,
        90,
        60
      ],
      "views": [
        {
          "if": [
            "!took_glue"
          ],
          "text": "推车下层有固体胶。",
          "take": {
            "give": [
              "glue"
            ],
            "set": [
              "took_glue"
            ],
            "text": "你拿起固体胶。"
          }
        },
        {
          "text": "推车空了。"
        }
      ]
    },
    {
      "id": "door",
      "name": "月球展厅门",
      "box": [
        200,
        160,
        120,
        110
      ],
      "views": [
        {
          "if": [
            "!door_ok"
          ],
          "text": "门锁旁有读卡槽，说明书夹在门缝：",
          "note": "【英语】The moon has different _____ .\n（月相，6 字母复数）\n——门禁其实要完整星图，不是这个词。这是干扰题！",
          "use": [
            {
              "item": "map_full",
              "set": [
                "door_ok"
              ],
              "win": true,
              "text": "完整星图贴上读卡槽——扫描通过！月球展厅的门缓缓打开，冷白的光泻出来。"
            }
          ],
          "wrong": "需要完整星图。"
        },
        {
          "text": "门已打开。"
        }
      ]
    }
  ],
  "combos": [
    {
      "a": "map_a",
      "b": "map_b",
      "give": [
        "map_ab"
      ],
      "text": "两半星图对上了，但还没粘牢，一碰就散。"
    },
    {
      "a": "map_ab",
      "b": "glue",
      "give": [
        "map_full"
      ],
      "set": [
        "map_ready"
      ],
      "text": "固体胶一抹——完整星图粘牢了！上面标着「月球展厅 ←」。"
    }
  ],
  "hints": [
    {
      "until": "panel_open",
      "obj": "panel",
      "tiers": [
        "开灯带控制盒。",
        "4 × 3.5。",
        "14。"
      ]
    },
    {
      "until": "took_lens",
      "obj": "panel",
      "tiers": [
        "拿透镜和左半星图。",
        "点控制盒。",
        "拿起。"
      ]
    },
    {
      "until": "took_mapb",
      "obj": "poster",
      "tiers": [
        "海报后面有东西。",
        "点志愿者海报。",
        "拿右半星图。"
      ]
    },
    {
      "until": "took_glue",
      "obj": "gluebox",
      "tiers": [
        "推车上有固体胶。",
        "点保洁推车。",
        "拿起。"
      ]
    },
    {
      "until": "map_ready",
      "obj": "door",
      "tiers": [
        "先把两半星图对上，再用胶粘牢。",
        "物品栏组合：左+右，再+胶。",
        "得到完整星图。"
      ]
    },
    {
      "until": "escaped",
      "obj": "door",
      "tiers": [
        "用完整星图开月球展厅门。",
        "选中星图点门。",
        "门开！"
      ]
    }
  ],
  "explain": [
    "4×3.5=14 开控制盒，拿透镜与星图左半。",
    "海报后拿右半，推车拿胶。",
    "左右拼接再粘胶得完整星图。",
    "刷星图进月球展厅。（英语 PHASES 是干扰）"
  ],
  "solution": [
    [
      "code",
      "panel",
      "14"
    ],
    [
      "take",
      "panel"
    ],
    [
      "take",
      "poster"
    ],
    [
      "take",
      "gluebox"
    ],
    [
      "combine",
      "map_a",
      "map_b"
    ],
    [
      "combine",
      "map_ab",
      "glue"
    ],
    [
      "use",
      "door",
      "map_full"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#0a1530')+R(0,230,400,70,'#152040');
for(var i=0;i<12;i++)s+=C(30+i*30,40+(i%3)*15,2,'#cde');
s+=g('mural',R(20,30,160,140,'#1a2a48',8,SK)+C(60,70,4,'#ffe')+C(90,55,3,'#ffe')+C(120,80,4,'#f88')+T(100,155,11,'壁画',' fill="#9ab"'));
s+=g('panel',R(200,40,100,80,'#3a4a66',8,SK)+T(250,80,12,'控制盒',' fill="#cde"'));
s+=g('poster',R(310,30,70,100,'#e8dcc8',6,SK)+T(345,80,11,'海报',' fill="#5b4636"'));
s+=g('gluebox',R(30,200,90,60,'#5a7060',8,SK)+T(75,270,11,'推车',' fill="#9ab"'));
s+=g('door',R(200,160,120,110,f.door_ok?'#2a6a8a':'#2a3a55',10,SK)+C(280,215,8,f.door_ok?'#6f6':'#888')+T(260,285,11,'月球门',' fill="#9ab"'));
return s;}
});
ROOMS.push({
  "id": "r3",
  "title": "月球展厅",
  "emoji": "🌕",
  "sub": "第一章 · 月相转盘",
  "story": [
    "展厅中央立着一座巨大的月相转盘。八个凹槽对应不同月相。",
    "白墨便签贴在护栏上：「对准正确的月相，第三颗行星在等你。」",
    "解开转盘，进入太阳系模型室。"
  ],
  "objects": [
    {
      "id": "sign",
      "name": "月相说明牌",
      "box": [
        20,
        30,
        110,
        90
      ],
      "views": [
        {
          "text": "说明牌写着月相顺序。有人用荧光笔标了一句：",
          "note": "【语文】“满月像一轮玉盘”写的是哪种月相？\n旁边涂鸦写着「新月！新月！」——那是干扰，别信。"
        }
      ]
    },
    {
      "id": "disk",
      "name": "月相转盘",
      "box": [
        150,
        50,
        140,
        140
      ],
      "views": [
        {
          "if": [
            "!disk_ok"
          ],
          "text": "转盘中央有汉字锁。护栏夹着纸条：",
          "note": "【成语填空】花 好 月 ___\n（美好团圆）",
          "lock": {
            "kind": "dial",
            "opts": [
              [
                "圆",
                "满",
                "亮",
                "明",
                "缺",
                "清"
              ]
            ],
            "answer": "圆",
            "prompt": "转到缺字",
            "ok": {
              "set": [
                "disk_ok"
              ],
              "text": "“圆”！转盘转到满月位置，暗格弹出一枚行星铭牌。"
            },
            "bad": "花好月___。"
          }
        },
        {
          "if": [
            "disk_ok",
            "!took_tag"
          ],
          "text": "暗格里有行星铭牌。",
          "take": {
            "give": [
              "planet_tag"
            ],
            "set": [
              "took_tag"
            ],
            "text": "铭牌上刻着「第三颗——地球」。"
          }
        },
        {
          "text": "转盘停在满月，暗格空了。"
        }
      ]
    },
    {
      "id": "cabinet",
      "name": "玻璃展柜",
      "box": [
        310,
        60,
        70,
        120
      ],
      "views": [
        {
          "if": [
            "!cab_open"
          ],
          "text": "展柜锁着。标签写着：",
          "note": "【算一算】简化题：35 ÷ 10 = ?",
          "lock": {
            "kind": "num",
            "len": 2,
            "dot": true,
            "answer": "3.5",
            "prompt": "输入得数",
            "ok": {
              "set": [
                "cab_open"
              ],
              "text": "3.5！柜门微开，里面有小磁铁。"
            },
            "bad": "35 ÷ 10。"
          }
        },
        {
          "if": [
            "cab_open",
            "!took_mag"
          ],
          "text": "展柜里有小磁铁。",
          "take": {
            "give": [
              "magnet"
            ],
            "set": [
              "took_mag"
            ],
            "text": "你拿起小磁铁。"
          }
        },
        {
          "text": "展柜空了。"
        }
      ]
    },
    {
      "id": "vent",
      "name": "地通风口",
      "box": [
        40,
        220,
        100,
        40
      ],
      "views": [
        {
          "if": [
            "!got_shard"
          ],
          "text": "通风口栅栏后有金属碎片，手够不着。",
          "use": [
            {
              "item": "magnet",
              "set": [
                "got_shard"
              ],
              "give": [
                "shard"
              ],
              "text": "磁铁吸起碎片！上面刻着半串数：…84"
            }
          ],
          "wrong": "需要能吸金属的东西。"
        },
        {
          "if": [
            "got_shard"
          ],
          "text": "通风口空了。"
        }
      ]
    },
    {
      "id": "door",
      "name": "太阳系室门",
      "box": [
        200,
        200,
        140,
        70
      ],
      "views": [
        {
          "if": [
            "!door_ok"
          ],
          "text": "门旁密码盘。残缺提示：",
          "note": "【拼起来】碎片写着 …84。墙上涂鸦写着「前面是 15」。\n完整密码：1584\n（干扰涂鸦：9999、2468 也有人写过）",
          "lock": {
            "kind": "num",
            "len": 4,
            "answer": "1584",
            "prompt": "四位密码",
            "ok": {
              "set": [
                "door_ok"
              ],
              "text": "1584！门锁松开。"
            },
            "bad": "墙上前两位 + 碎片后两位。"
          }
        },
        {
          "if": [
            "door_ok"
          ],
          "text": "门锁已开。把行星铭牌插进门槽。",
          "use": [
            {
              "item": "planet_tag",
              "win": true,
              "text": "铭牌咔哒嵌入——“第三颗行星确认”。太阳系模型室的灯逐盏亮起。"
            }
          ],
          "wrong": "用行星铭牌。"
        }
      ]
    }
  ],
  "combos": [],
  "hints": [
    {
      "until": "disk_ok",
      "obj": "disk",
      "tiers": [
        "月相转盘是成语锁。",
        "花好月___。",
        "圆。"
      ]
    },
    {
      "until": "took_tag",
      "obj": "disk",
      "tiers": [
        "拿行星铭牌。",
        "点转盘暗格。",
        "拿起。"
      ]
    },
    {
      "until": "cab_open",
      "obj": "cabinet",
      "tiers": [
        "打开玻璃展柜。",
        "35 ÷ 10。",
        "3.5。"
      ]
    },
    {
      "until": "took_mag",
      "obj": "cabinet",
      "tiers": [
        "拿小磁铁。",
        "点展柜。",
        "拿起。"
      ]
    },
    {
      "until": "got_shard",
      "obj": "vent",
      "tiers": [
        "用磁铁吸通风口碎片。",
        "选中磁铁点通风口。",
        "得到 …84。"
      ]
    },
    {
      "until": "door_ok",
      "obj": "door",
      "tiers": [
        "密码是墙上 15 + 碎片 84。",
        "1584。",
        "输入 1584。"
      ]
    },
    {
      "until": "escaped",
      "obj": "door",
      "tiers": [
        "门锁开后，插行星铭牌。",
        "选中铭牌点门。",
        "进入太阳系室！"
      ]
    }
  ],
  "explain": [
    "「花好月圆」开转盘得铭牌。",
    "35÷10=3.5 开展柜拿磁铁。",
    "吸碎片得 84，与墙上 15 组成 1584。",
    "开锁后插铭牌进入太阳系室。"
  ],
  "solution": [
    [
      "code",
      "disk",
      "圆"
    ],
    [
      "take",
      "disk"
    ],
    [
      "code",
      "cabinet",
      "3.5"
    ],
    [
      "take",
      "cabinet"
    ],
    [
      "use",
      "vent",
      "magnet"
    ],
    [
      "code",
      "door",
      "1584"
    ],
    [
      "use",
      "door",
      "planet_tag"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#101828')+R(0,240,400,60,'#1c2438');
s+=g('sign',R(20,30,110,90,'#e8e0c8',6,SK)+T(75,75,12,'说明牌',' fill="#3a2a1a"'));
s+=g('disk',C(220,110,55,'#d8d0b0')+C(220,110,35,'#202838')+T(220,180,11,'月相盘',' fill="#9ab"'));
s+=g('cabinet',R(310,60,70,120,'#6a90aa',6,SK)+R(318,70,54,90,'#a8d0e8',4)+T(345,200,11,'展柜',' fill="#9ab"'));
s+=g('vent',R(40,220,100,40,'#333',4,SK)+T(90,275,11,'通风口',' fill="#9ab"'));
s+=g('door',R(200,200,140,70,f.door_ok?'#2a5a6a':'#2a3548',8,SK)+T(270,235,12,'太阳系门',' fill="#cde"'));
return s;}
});
ROOMS.push({
  "id": "r4",
  "title": "太阳系模型室",
  "emoji": "🪐",
  "sub": "第二章 · 八大行星",
  "story": [
    "头顶悬着八大行星模型，缓缓转动。地球模型微微发亮。",
    "白墨便签：「顺序错了就会卡住。从太阳往外数，别把冥王星算进来。」",
    "拿到陨石室门禁卡。"
  ],
  "objects": [
    {
      "id": "sun",
      "name": "太阳模型",
      "box": [
        20,
        40,
        80,
        80
      ],
      "views": [
        {
          "text": "暖黄的太阳模型。底座刻着：水金地火木土天海——没有冥王星。"
        }
      ]
    },
    {
      "id": "earth",
      "name": "地球模型",
      "box": [
        160,
        60,
        90,
        90
      ],
      "views": [
        {
          "if": [
            "!earth_ok"
          ],
          "text": "地球模型底座有字母锁。旁注：",
          "note": "【英语】The _____ is the third planet from the Sun.\n（地球，5 字母）",
          "lock": {
            "kind": "alpha",
            "len": 5,
            "answer": "EARTH",
            "prompt": "输入英文单词",
            "ok": {
              "set": [
                "earth_ok"
              ],
              "text": "EARTH！底座暗格打开，露出没电的小夹灯。"
            },
            "bad": "第三颗行星的英文名。"
          }
        },
        {
          "if": [
            "earth_ok",
            "!took_clip"
          ],
          "text": "暗格里有小夹灯。",
          "take": {
            "give": [
              "clip_lamp"
            ],
            "set": [
              "took_clip"
            ],
            "text": "小夹灯不亮，需要电池。"
          }
        },
        {
          "text": "暗格空了。"
        }
      ]
    },
    {
      "id": "box",
      "name": "教具箱",
      "box": [
        280,
        50,
        100,
        70
      ],
      "views": [
        {
          "if": [
            "!box_ok"
          ],
          "text": "教具箱密码锁：",
          "note": "【算一算】8 颗行星，分成 2 组讲解，每组几颗？\n8 ÷ 2 = ?",
          "lock": {
            "kind": "num",
            "len": 1,
            "answer": "4",
            "prompt": "输入得数",
            "ok": {
              "set": [
                "box_ok"
              ],
              "text": "4！箱里有夹灯电池。"
            },
            "bad": "8 ÷ 2。"
          }
        },
        {
          "if": [
            "box_ok",
            "!took_bat2"
          ],
          "text": "夹灯电池。",
          "take": {
            "give": [
              "lens_clip"
            ],
            "set": [
              "took_bat2"
            ],
            "text": "你拿起夹灯电池。"
          }
        },
        {
          "text": "教具箱空了。"
        }
      ]
    },
    {
      "id": "pluto",
      "name": "冥王星海报",
      "box": [
        30,
        180,
        100,
        80
      ],
      "views": [
        {
          "text": "过时的冥王星海报。涂鸦：「还算第九颗吗？」——干扰，太阳系模型室不认它。"
        }
      ]
    },
    {
      "id": "cabinet",
      "name": "暗格展柜",
      "box": [
        160,
        180,
        120,
        80
      ],
      "views": [
        {
          "if": [
            "!cab_lit"
          ],
          "text": "展柜里很暗，看不清。",
          "use": [
            {
              "item": "clip_on",
              "set": [
                "cab_lit"
              ],
              "text": "夹灯一照——暗格里有陨石卡！"
            }
          ],
          "wrong": "需要亮光。"
        },
        {
          "if": [
            "cab_lit",
            "!took_card"
          ],
          "text": "陨石卡躺在暗格里。",
          "take": {
            "give": [
              "meteor_card"
            ],
            "set": [
              "took_card"
            ],
            "text": "你拿到陨石卡。背面写着「标本室」。"
          }
        },
        {
          "text": "暗格空了。"
        }
      ]
    },
    {
      "id": "door",
      "name": "陨石标本室门",
      "box": [
        300,
        180,
        80,
        90
      ],
      "views": [
        {
          "if": [
            "!gone"
          ],
          "text": "刷卡门禁。",
          "use": [
            {
              "item": "meteor_card",
              "set": [
                "gone"
              ],
              "win": true,
              "text": "嘀——门开了。一股微凉的空气扑面：陨石标本室到了。"
            }
          ],
          "wrong": "需要陨石卡。"
        },
        {
          "text": "门开着。"
        }
      ]
    }
  ],
  "combos": [
    {
      "a": "clip_lamp",
      "b": "lens_clip",
      "give": [
        "clip_on"
      ],
      "set": [
        "clip_ready"
      ],
      "text": "电池装进夹灯——亮了！"
    }
  ],
  "hints": [
    {
      "until": "earth_ok",
      "obj": "earth",
      "tiers": [
        "地球模型字母锁。",
        "第三颗行星英文。",
        "EARTH。"
      ]
    },
    {
      "until": "took_clip",
      "obj": "earth",
      "tiers": [
        "拿小夹灯。",
        "点地球模型。",
        "拿起。"
      ]
    },
    {
      "until": "box_ok",
      "obj": "box",
      "tiers": [
        "开教具箱。",
        "8 ÷ 2。",
        "4。"
      ]
    },
    {
      "until": "took_bat2",
      "obj": "box",
      "tiers": [
        "拿夹灯电池。",
        "点教具箱。",
        "拿起。"
      ]
    },
    {
      "until": "clip_ready",
      "obj": "box",
      "tiers": [
        "夹灯和电池组合。",
        "物品栏先后点。",
        "亮着夹灯。"
      ]
    },
    {
      "until": "cab_lit",
      "obj": "cabinet",
      "tiers": [
        "用亮着夹灯照暗格展柜。",
        "选中夹灯点展柜。",
        "看见陨石卡。"
      ]
    },
    {
      "until": "took_card",
      "obj": "cabinet",
      "tiers": [
        "拿陨石卡。",
        "点展柜。",
        "拿起。"
      ]
    },
    {
      "until": "escaped",
      "obj": "door",
      "tiers": [
        "刷陨石卡开门。",
        "选中卡点门。",
        "进入标本室！"
      ]
    }
  ],
  "explain": [
    "EARTH 开地球底座拿夹灯。",
    "8÷2=4 开教具箱拿电池。",
    "组合点亮夹灯，照暗格得陨石卡。",
    "刷卡进入陨石标本室。"
  ],
  "solution": [
    [
      "code",
      "earth",
      "EARTH"
    ],
    [
      "take",
      "earth"
    ],
    [
      "code",
      "box",
      "4"
    ],
    [
      "take",
      "box"
    ],
    [
      "combine",
      "clip_lamp",
      "lens_clip"
    ],
    [
      "use",
      "cabinet",
      "clip_on"
    ],
    [
      "take",
      "cabinet"
    ],
    [
      "use",
      "door",
      "meteor_card"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#0c1228')+R(0,230,400,70,'#1a2038');
s+=g('sun',C(60,80,35,'#ffb84a')+T(60,130,11,'太阳',' fill="#9ab"'));
s+=g('earth',C(200,100,40,f.earth_ok?'#5ad':'#3a6a8a')+T(200,155,11,'地球',' fill="#9ab"'));
s+=g('box',R(280,50,100,70,'#5a4a38',8,SK)+T(330,90,12,'教具箱',' fill="#cde"'));
s+=g('pluto',R(30,180,100,80,'#d8d0e0',6,SK)+T(80,220,11,'冥王星',' fill="#5b4636"'));
s+=g('cabinet',R(160,180,120,80,f.cab_lit?'#4a6050':'#222838',8,SK)+T(220,225,11,'暗格',' fill="#9ab"'));
s+=g('door',R(300,180,80,90,f.escaped_flag?'#2a6a4a':'#334',8,SK)+T(340,275,11,'标本门',' fill="#9ab"'));
return s;}
});
ROOMS.push({
  "id": "r5",
  "title": "陨石标本室",
  "emoji": "☄️",
  "sub": "第二章 · 铁石低语",
  "story": [
    "玻璃柜里陈列着大大小小的陨石。有的标着重，有的标着发现年份。",
    "白墨：「最重的那块下面，藏着通往放映厅的证。注意假标签。」",
    "拿到放映厅证和小钥匙，打开双锁门。"
  ],
  "objects": [
    {
      "id": "label",
      "name": "错误标签墙",
      "box": [
        20,
        30,
        120,
        100
      ],
      "views": [
        {
          "text": "墙上贴着三张标签：A 陨石 2.4kg · B 陨石 9.9kg · C 陨石 3.6kg。",
          "note": "【干扰】B 的 9.9 是用马克笔新改的，底下隐约还有 1.8。真·最重请看铜铭牌。"
        }
      ]
    },
    {
      "id": "plaque",
      "name": "真·铭牌",
      "box": [
        160,
        40,
        100,
        60
      ],
      "views": [
        {
          "text": "铜铭牌：「本室镇馆石：天外铁 · 净重 3.6 千克」。旁边演算纸：",
          "note": "【算一算】若按 1.2 元/千克估算展保险费：3.6 × 1.2 = ?"
        }
      ]
    },
    {
      "id": "case",
      "name": "镇馆石展柜",
      "box": [
        160,
        120,
        140,
        100
      ],
      "views": [
        {
          "if": [
            "!case_ok"
          ],
          "text": "展柜密码锁。提示写着「保险费」：",
          "note": "看真·铭牌旁的算式。3.6 × 1.2 = ?",
          "lock": {
            "kind": "num",
            "len": 3,
            "dot": true,
            "answer": "4.32",
            "prompt": "输入得数",
            "ok": {
              "set": [
                "case_ok"
              ],
              "text": "4.32！展柜微抬，下面露出放映厅证。"
            },
            "bad": "3.6 × 1.2。"
          }
        },
        {
          "if": [
            "case_ok",
            "!took_pass"
          ],
          "text": "放映厅证。",
          "take": {
            "give": [
              "radio_pass"
            ],
            "set": [
              "took_pass"
            ],
            "text": "你拿到放映厅证。"
          }
        },
        {
          "text": "展柜下空了。"
        }
      ]
    },
    {
      "id": "safe",
      "name": "小保险柜",
      "box": [
        320,
        50,
        60,
        80
      ],
      "views": [
        {
          "if": [
            "!safe_ok"
          ],
          "text": "保险柜转盘锁：",
          "note": "【成语填空】流 星 赶 ___\n（形容很快）",
          "lock": {
            "kind": "dial",
            "opts": [
              [
                "月",
                "日",
                "星",
                "云",
                "火",
                "电"
              ]
            ],
            "answer": "月",
            "prompt": "转到缺字",
            "ok": {
              "set": [
                "safe_ok"
              ],
              "give": [
                "cab_key"
              ],
              "text": "“月”！里面有一把小钥匙。"
            },
            "bad": "流星赶___。"
          }
        },
        {
          "if": [
            "safe_ok"
          ],
          "text": "保险柜开着，钥匙已拿走。"
        }
      ]
    },
    {
      "id": "door",
      "name": "放映厅门",
      "box": [
        40,
        200,
        120,
        70
      ],
      "views": [
        {
          "if": [
            "!pass_swiped",
            "!key_turned"
          ],
          "text": "双锁门：需要刷证件，也需要钥匙拧副锁。",
          "use": [
            {
              "item": "radio_pass",
              "set": [
                "pass_swiped"
              ],
              "text": "证件刷过了，副锁还锁着。"
            },
            {
              "item": "cab_key",
              "set": [
                "key_turned"
              ],
              "text": "钥匙拧开了副锁，还差刷证件。"
            }
          ],
          "wrong": "需要放映厅证和小钥匙。"
        },
        {
          "if": [
            "pass_swiped",
            "!key_turned"
          ],
          "text": "证件已刷，还差副锁钥匙。",
          "use": [
            {
              "item": "cab_key",
              "set": [
                "key_turned"
              ],
              "win": true,
              "text": "钥匙一拧——双锁齐开！放映厅座椅成排，银幕幽幽发白。"
            }
          ],
          "wrong": "用小钥匙拧副锁。"
        },
        {
          "if": [
            "!pass_swiped",
            "key_turned"
          ],
          "text": "副锁已开，还差刷证件。",
          "use": [
            {
              "item": "radio_pass",
              "set": [
                "pass_swiped"
              ],
              "win": true,
              "text": "证件一刷——双锁齐开！放映厅座椅成排，银幕幽幽发白。"
            }
          ],
          "wrong": "刷放映厅证。"
        },
        {
          "if": [
            "pass_swiped",
            "key_turned"
          ],
          "text": "门已经开了。"
        }
      ]
    }
  ],
  "combos": [],
  "hints": [
    {
      "until": "case_ok",
      "obj": "case",
      "tiers": [
        "别信墙上的 9.9，看铜铭牌。",
        "3.6 × 1.2。",
        "4.32。"
      ]
    },
    {
      "until": "took_pass",
      "obj": "case",
      "tiers": [
        "拿放映厅证。",
        "点镇馆石展柜。",
        "拿起。"
      ]
    },
    {
      "until": "safe_ok",
      "obj": "safe",
      "tiers": [
        "开小保险柜。",
        "流星赶___。",
        "月。"
      ]
    },
    {
      "until": "escaped",
      "obj": "door",
      "tiers": [
        "证件和钥匙都要用在门上。",
        "先用一件，再用另一件。",
        "双锁齐开！"
      ]
    }
  ],
  "explain": [
    "铭牌真重 3.6，3.6×1.2=4.32 开展柜得证件。（9.9 是假标签）",
    "「流星赶月」开保险柜得小钥匙。",
    "证件+钥匙双开进入放映厅。"
  ],
  "solution": [
    [
      "code",
      "case",
      "4.32"
    ],
    [
      "take",
      "case"
    ],
    [
      "code",
      "safe",
      "月"
    ],
    [
      "use",
      "door",
      "radio_pass"
    ],
    [
      "use",
      "door",
      "cab_key"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#121820')+R(0,230,400,70,'#1c242c');
s+=g('label',R(20,30,120,100,'#e8e0d0',6,SK)+T(80,80,12,'标签墙',' fill="#3a2a1a"'));
s+=g('plaque',R(160,40,100,60,'#c9a227',6,SK)+T(210,70,12,'铭牌',' fill="#2a1a00"'));
s+=g('case',R(160,120,140,100,'#4a5568',8,SK)+C(230,170,28,'#6a7080')+T(230,235,11,'镇馆石',' fill="#9ab"'));
s+=g('safe',R(320,50,60,80,'#3a3a48',6,SK)+T(350,140,11,'保险柜',' fill="#9ab"'));
s+=g('door',R(40,200,120,70,f.pass_swiped&&f.key_turned?'#2a6a4a':'#334',8,SK)+T(100,240,12,'放映厅门',' fill="#cde"'));
return s;}
});
ROOMS.push({
  "id": "r6",
  "title": "放映厅",
  "emoji": "🎬",
  "sub": "第三章 · 银幕低语",
  "story": [
    "银幕还亮着最后一帧星空。放映间门锁着。",
    "座椅夹层里露出半截录音带标签。白墨：「听清楚最后一个词。」",
    "拿到控制室门禁。"
  ],
  "objects": [
    {
      "id": "screen",
      "name": "银幕",
      "box": [
        80,
        30,
        240,
        100
      ],
      "views": [
        {
          "text": "银幕定格在星空图。字幕残影：",
          "note": "【英语听力稿】Please turn off the _____ before the show ends.\n（灯，6 字母）\n——这是后面控制室的伏笔，放映厅门不用它。"
        }
      ]
    },
    {
      "id": "seat",
      "name": "第三排座椅",
      "box": [
        40,
        160,
        80,
        50
      ],
      "views": [
        {
          "if": [
            "!took_half"
          ],
          "text": "座椅夹缝里有半卷标签纸。",
          "take": {
            "give": [
              "tape"
            ],
            "set": [
              "took_half"
            ],
            "text": "录音带！内侧模糊写着 EXIT 样的字。"
          }
        },
        {
          "text": "夹缝空了。"
        }
      ]
    },
    {
      "id": "cabinet",
      "name": "磁带柜",
      "box": [
        160,
        160,
        90,
        70
      ],
      "views": [
        {
          "if": [
            "!cab_open"
          ],
          "text": "磁带柜锁着。旁贴词语：",
          "note": "【成语填空】目 不 转 ___\n（看的时候眼睛都不眨）",
          "lock": {
            "kind": "dial",
            "opts": [
              [
                "睛",
                "眼",
                "神",
                "光",
                "视",
                "目"
              ]
            ],
            "answer": "睛",
            "prompt": "转到缺字",
            "ok": {
              "set": [
                "cab_open"
              ],
              "text": "“睛”！柜门开了。"
            },
            "bad": "目不转___。"
          }
        },
        {
          "if": [
            "cab_open",
            "!took_fuse"
          ],
          "text": "柜子里有保险丝和一张纸条。",
          "take": {
            "give": [
              "fuse"
            ],
            "set": [
              "took_fuse"
            ],
            "text": "你拿起保险丝。纸条写着：「控制室需要它」。"
          }
        },
        {
          "text": "磁带柜空了。"
        }
      ]
    },
    {
      "id": "booth",
      "name": "放映间门",
      "box": [
        280,
        140,
        100,
        80
      ],
      "views": [
        {
          "if": [
            "!booth_ok"
          ],
          "text": "放映间有字母锁。磁带内侧提示：",
          "note": "【英语】影院出口常写着：_____（4 字母）",
          "lock": {
            "kind": "alpha",
            "len": 4,
            "answer": "EXIT",
            "prompt": "输入英文",
            "ok": {
              "set": [
                "booth_ok"
              ],
              "give": [
                "dome_pass"
              ],
              "text": "EXIT！门开了一条缝，里面掉出圆顶通行证……不对，是控制室通行证，贴纸写着「先去控制室」。"
            },
            "bad": "出口 EXIT。"
          }
        },
        {
          "if": [
            "booth_ok"
          ],
          "text": "放映间缝里已经空了。"
        }
      ]
    },
    {
      "id": "door",
      "name": "控制室门",
      "box": [
        40,
        50,
        50,
        90
      ],
      "views": [
        {
          "if": [
            "!gone"
          ],
          "text": "刷通行证，并准备好保险丝。",
          "use": [
            {
              "item": "dome_pass",
              "set": [
                "gone"
              ],
              "win": true,
              "text": "通行证一刷——控制室的门开了。里面仪表盘还在闪红灯。"
            }
          ],
          "wrong": "需要放映间拿到的通行证。"
        },
        {
          "text": "门开着。"
        }
      ]
    }
  ],
  "combos": [],
  "hints": [
    {
      "until": "took_half",
      "obj": "seat",
      "tiers": [
        "座椅夹缝有东西。",
        "点第三排座椅。",
        "拿录音带。"
      ]
    },
    {
      "until": "cab_open",
      "obj": "cabinet",
      "tiers": [
        "开磁带柜。",
        "目不转___。",
        "睛。"
      ]
    },
    {
      "until": "took_fuse",
      "obj": "cabinet",
      "tiers": [
        "拿保险丝。",
        "点磁带柜。",
        "拿起。"
      ]
    },
    {
      "until": "booth_ok",
      "obj": "booth",
      "tiers": [
        "听/看磁带提示开放映间。",
        "EXIT。",
        "输入 EXIT。"
      ]
    },
    {
      "until": "escaped",
      "obj": "door",
      "tiers": [
        "用通行证开控制室门。",
        "选中通行证点门。",
        "进入！"
      ]
    }
  ],
  "explain": [
    "座椅拿到录音带（EXIT 提示）。",
    "「目不转睛」开磁带柜得保险丝（带到下一关氛围/下一房会用——本房 win 靠通行证）。",
    "EXIT 开放映间得通行证。",
    "刷证进控制室。"
  ],
  "solution": [
    [
      "take",
      "seat"
    ],
    [
      "code",
      "cabinet",
      "睛"
    ],
    [
      "take",
      "cabinet"
    ],
    [
      "code",
      "booth",
      "EXIT"
    ],
    [
      "use",
      "door",
      "dome_pass"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#0e1018')+R(0,220,400,80,'#1a1c28');
s+=g('screen',R(80,30,240,100,'#1a2030',4,SK)+R(90,40,220,80,'#2a3548')+T(200,80,14,'银幕',' fill="#8ab"'));
s+=g('seat',R(40,160,80,50,'#4a3040',8,SK)+T(80,220,11,'座椅',' fill="#9ab"'));
s+=g('booth',R(280,140,100,80,'#3a3a50',8,SK)+T(330,185,12,'放映间',' fill="#cde"'));
s+=g('cabinet',R(160,160,90,70,'#5a4a38',6,SK)+T(205,230,11,'磁带柜',' fill="#9ab"'));
s+=g('door',R(40,50,50,90,f.door_ok?'#2a6a4a':'#334',6,SK)+T(65,155,11,'控制门',' fill="#9ab"'));
return s;}
});
ROOMS.push({
  "id": "r7",
  "title": "控制室",
  "emoji": "🖥️",
  "sub": "第三章 · 红灯闪烁",
  "story": [
    "仪表盘一片红。电闸跳闸了。",
    "白墨便签贴在屏幕边：「先通电，再校准圆顶。密码在值班条上。」",
    "恢复供电，打开观星圆顶的门。"
  ],
  "objects": [
    {
      "id": "panel",
      "name": "电闸箱",
      "box": [
        40,
        40,
        140,
        120
      ],
      "views": [
        {
          "if": [
            "!fuse_in"
          ],
          "text": "电闸箱缺保险丝。旁边零件盒可能有。",
          "use": [
            {
              "item": "fuse",
              "set": [
                "fuse_in"
              ],
              "text": "保险丝卡进去——还差合闸密码。"
            }
          ],
          "wrong": "需要保险丝。"
        },
        {
          "if": [
            "fuse_in",
            "!power_on"
          ],
          "text": "保险丝在，合闸要密码：",
          "note": "看值班条上的算式。",
          "lock": {
            "kind": "num",
            "len": 2,
            "dot": true,
            "answer": "9.6",
            "prompt": "输入合闸码",
            "ok": {
              "set": [
                "power_on"
              ],
              "text": "9.6！绿灯亮起，供电恢复。"
            },
            "bad": "看值班条。"
          }
        },
        {
          "if": [
            "power_on"
          ],
          "text": "电闸箱绿灯常亮。"
        }
      ]
    },
    {
      "id": "note",
      "name": "值班条",
      "box": [
        220,
        40,
        140,
        70
      ],
      "views": [
        {
          "text": "今晚值班：林馆长助理。演算：",
          "note": "【算一算】备用电压档 8 × 1.2 = ?\n（合闸码）\n涂鸦干扰：7.5×1.2=9 有人写过，别用错。"
        }
      ]
    },
    {
      "id": "box",
      "name": "零件盒",
      "box": [
        220,
        140,
        100,
        60
      ],
      "views": [
        {
          "if": [
            "!took_fuse"
          ],
          "text": "零件盒没锁。",
          "take": {
            "give": [
              "fuse"
            ],
            "set": [
              "took_fuse"
            ],
            "text": "你拿起一根保险丝。"
          }
        },
        {
          "text": "零件盒空了。"
        }
      ]
    },
    {
      "id": "console",
      "name": "主控制台",
      "box": [
        40,
        180,
        150,
        80
      ],
      "views": [
        {
          "if": [
            "!power_on"
          ],
          "text": "没电，屏幕黑着。",
          "wrong": "先恢复供电。"
        },
        {
          "if": [
            "power_on",
            "!console_ok"
          ],
          "text": "屏幕亮了。英文提示：",
          "note": "【英语】Please turn off the _____ .\n（灯，6 字母）——大厅告示的那题！",
          "lock": {
            "kind": "alpha",
            "len": 6,
            "answer": "LIGHTS",
            "prompt": "输入英文",
            "ok": {
              "set": [
                "console_ok"
              ],
              "give": [
                "office_key"
              ],
              "text": "LIGHTS！抽屉弹出一把馆长室钥匙，还有圆顶门禁已授权。"
            },
            "bad": "关灯：LIGHTS。"
          }
        },
        {
          "if": [
            "console_ok"
          ],
          "text": "控制台已授权圆顶通道。"
        }
      ]
    },
    {
      "id": "door",
      "name": "圆顶通道门",
      "box": [
        300,
        180,
        80,
        90
      ],
      "views": [
        {
          "if": [
            "!console_ok"
          ],
          "text": "门禁未授权，先完成控制台。",
          "wrong": "先给控制台通电并输入口令。"
        },
        {
          "if": [
            "console_ok"
          ],
          "text": "门禁已绿。用馆长室钥匙？不——这扇是圆顶门，推开即可。",
          "use": [
            {
              "item": "office_key",
              "set": [
                "gone"
              ],
              "win": true,
              "text": "钥匙在门锁上转了一下（备用授权）——圆顶通道打开。寒风与星光同时涌进来。"
            }
          ],
          "wrong": "用控制台弹出的钥匙点门。"
        }
      ]
    }
  ],
  "combos": [],
  "hints": [
    {
      "until": "took_fuse",
      "obj": "box",
      "tiers": [
        "零件盒有保险丝。",
        "点零件盒。",
        "拿起。"
      ]
    },
    {
      "until": "fuse_in",
      "obj": "panel",
      "tiers": [
        "把保险丝装进电闸箱。",
        "选中保险丝点电闸。",
        "装好。"
      ]
    },
    {
      "until": "power_on",
      "obj": "note",
      "tiers": [
        "值班条算合闸码。",
        "8 × 1.2。",
        "9.6。"
      ]
    },
    {
      "until": "console_ok",
      "obj": "console",
      "tiers": [
        "通电后开控制台。",
        "LIGHTS。",
        "输入 LIGHTS。"
      ]
    },
    {
      "until": "escaped",
      "obj": "door",
      "tiers": [
        "用弹出的钥匙开圆顶门。",
        "选中钥匙点门。",
        "进入圆顶！"
      ]
    }
  ],
  "explain": [
    "零件盒拿保险丝装进电闸。",
    "8×1.2=9.6 合闸（别用干扰 9）。",
    "LIGHTS 开控制台得钥匙。",
    "钥匙开圆顶通道。"
  ],
  "solution": [
    [
      "take",
      "box"
    ],
    [
      "use",
      "panel",
      "fuse"
    ],
    [
      "code",
      "panel",
      "9.6"
    ],
    [
      "code",
      "console",
      "LIGHTS"
    ],
    [
      "use",
      "door",
      "office_key"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#101418')+R(0,230,400,70,'#1a2028');
s+=g('panel',R(40,40,140,120,'#2a3038',8,SK)+R(50,50,120,40,f.power_on?'#2a8a4a':'#8a2a2a')+T(110,120,12,'电闸',' fill="#cde"'));
s+=g('note',R(220,40,140,70,'#f4efe0',6,SK)+T(290,75,12,'值班条',' fill="#3a2a1a"'));
s+=g('box',R(220,140,100,60,'#5a4a38',8,SK)+T(270,175,12,'零件盒',' fill="#cde"'));
s+=g('console',R(40,180,150,80,'#3a4560',8,SK)+T(115,225,12,'控制台',' fill="#cde"'));
s+=g('door',R(300,180,80,90,f.door_ok?'#2a6a4a':'#334',8,SK)+T(340,275,11,'圆顶门',' fill="#9ab"'));
return s;}
});
ROOMS.push({
  "id": "r8",
  "title": "观星圆顶",
  "emoji": "🔭",
  "sub": "第四章 · 星钥齐聚",
  "story": [
    "巨大的圆顶裂开一道缝，夜空倾泻而下。中心架着老式望远镜。",
    "白墨：「校准北极方向，星钥箱才会开。馆长室在那扇小门后。」",
    "打开星钥箱，进入馆长办公室。"
  ],
  "objects": [
    {
      "id": "panel",
      "name": "校准盘",
      "box": [
        40,
        60,
        90,
        80
      ],
      "views": [
        {
          "if": [
            "!cal_ok"
          ],
          "text": "校准盘数字锁。旁注：",
          "note": "【算一算】望远镜仰角从 12.5 度调到 20 度，升高了多少度？\n20 − 12.5 = ?",
          "lock": {
            "kind": "num",
            "len": 2,
            "dot": true,
            "answer": "7.5",
            "prompt": "输入差值",
            "ok": {
              "set": [
                "cal_ok"
              ],
              "text": "7.5！校准完成，望远镜自动转向。"
            },
            "bad": "20 − 12.5。"
          }
        },
        {
          "if": [
            "cal_ok"
          ],
          "text": "校准盘已锁定在正确仰角。"
        }
      ]
    },
    {
      "id": "scope",
      "name": "望远镜",
      "box": [
        150,
        80,
        100,
        120
      ],
      "views": [
        {
          "if": [
            "!cal_ok"
          ],
          "text": "镜头模糊，先完成校准盘。",
          "wrong": "先校准。"
        },
        {
          "if": [
            "cal_ok",
            "!scope_ok"
          ],
          "text": "目镜旁有汉字转盘：",
          "note": "【成语填空】众 星 捧 ___\n（大家簇拥着一个人）",
          "lock": {
            "kind": "dial",
            "opts": [
              [
                "月",
                "日",
                "星",
                "王",
                "云",
                "火"
              ]
            ],
            "answer": "月",
            "prompt": "转到缺字",
            "ok": {
              "set": [
                "scope_ok"
              ],
              "text": "“月”！目镜亮起，投射出四枚星钥的虚影——其中一枚实体落在星钥箱上。"
            },
            "bad": "众星捧___。"
          }
        },
        {
          "if": [
            "scope_ok"
          ],
          "text": "望远镜指向正确的夜空方位。"
        }
      ]
    },
    {
      "id": "chest",
      "name": "星钥箱",
      "box": [
        280,
        160,
        90,
        70
      ],
      "views": [
        {
          "if": [
            "!scope_ok"
          ],
          "text": "箱子锁着，像在等望远镜的信号。",
          "wrong": "先校准望远镜。"
        },
        {
          "if": [
            "scope_ok",
            "!chest_ok"
          ],
          "text": "箱盖有四位密码。底座刻字：",
          "note": "【拼证】校准差值去小数点：75；成语「月」在转盘第 1 格……\n实际密码看投影字幕：2018（白墨成为志愿者的年份，海报上有）。\n干扰：2020、1999。",
          "lock": {
            "kind": "num",
            "len": 4,
            "answer": "2018",
            "prompt": "四位年份",
            "ok": {
              "set": [
                "chest_ok"
              ],
              "give": [
                "star_key1"
              ],
              "text": "2018！箱子打开，青之星钥在掌心发亮。旁还有馆长室门禁卡槽已激活的提示。"
            },
            "bad": "想想志愿者海报上的年份。"
          }
        },
        {
          "if": [
            "chest_ok",
            "!took_key"
          ],
          "text": "星钥已在物品栏。箱底还有纸条。",
          "take": {
            "give": [
              "code_slip"
            ],
            "set": [
              "took_key"
            ],
            "text": "纸条写着：潮汐门备用码后两位 37。前两位在馆长室。"
          }
        },
        {
          "text": "箱子空了。"
        }
      ]
    },
    {
      "id": "door",
      "name": "馆长室小门",
      "box": [
        40,
        180,
        80,
        90
      ],
      "views": [
        {
          "if": [
            "!chest_ok"
          ],
          "text": "门禁未激活。",
          "wrong": "先打开星钥箱。"
        },
        {
          "if": [
            "chest_ok"
          ],
          "text": "门禁绿灯。用青之星钥触碰。",
          "use": [
            {
              "item": "star_key1",
              "win": true,
              "text": "星钥贴上感应区——小门滑开。檀木气味的馆长办公室出现在眼前。"
            }
          ],
          "wrong": "用青之星钥。"
        }
      ]
    }
  ],
  "combos": [],
  "hints": [
    {
      "until": "cal_ok",
      "obj": "panel",
      "tiers": [
        "先算校准盘。",
        "20 − 12.5。",
        "7.5。"
      ]
    },
    {
      "until": "scope_ok",
      "obj": "scope",
      "tiers": [
        "望远镜成语锁。",
        "众星捧___。",
        "月。"
      ]
    },
    {
      "until": "chest_ok",
      "obj": "chest",
      "tiers": [
        "星钥箱密码是年份。",
        "白墨志愿者年份。",
        "2018。"
      ]
    },
    {
      "until": "took_key",
      "obj": "chest",
      "tiers": [
        "拿箱底纸条。",
        "点星钥箱。",
        "拿起。"
      ]
    },
    {
      "until": "escaped",
      "obj": "door",
      "tiers": [
        "用青之星钥开馆长室门。",
        "选中星钥点门。",
        "进入！"
      ]
    }
  ],
  "explain": [
    "20−12.5=7.5 完成校准。",
    "「众星捧月」开望远镜。",
    "2018（志愿者年份）开星钥箱得青之星钥与密码线索。",
    "星钥打开馆长室。"
  ],
  "solution": [
    [
      "code",
      "panel",
      "7.5"
    ],
    [
      "code",
      "scope",
      "月"
    ],
    [
      "code",
      "chest",
      "2018"
    ],
    [
      "take",
      "chest"
    ],
    [
      "use",
      "door",
      "star_key1"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#080c18');
s+=P('M0 300 Q200 40 400 300','#0a1830','');
for(var i=0;i<20;i++)s+=C(20+i*18,30+(i*7)%80,2,'#eef');
s+=g('scope',R(150,80,100,120,'#4a5568',8,SK)+C(200,100,30,'#2a3548')+T(200,220,11,'望远镜',' fill="#9ab"'));
s+=g('panel',R(40,60,90,80,'#3a4a66',8,SK)+T(85,100,12,'校准盘',' fill="#cde"'));
s+=g('chest',R(280,160,90,70,'#6a5040',8,SK)+T(325,200,12,'星钥箱',' fill="#cde"'));
s+=g('door',R(40,180,80,90,f.door_ok?'#2a6a4a':'#334',8,SK)+T(80,275,11,'馆长室',' fill="#9ab"'));
return s;}
});
ROOMS.push({
  "id": "r9",
  "title": "馆长办公室",
  "emoji": "📜",
  "sub": "第四章 · 白墨真名",
  "story": [
    "书桌整齐，相框里一个少年志愿者笑着比耶，胸牌：白墨。",
    "抽屉没锁紧。保险箱在角落低鸣。",
    "找出真相信与潮汐门钥匙。"
  ],
  "objects": [
    {
      "id": "photo",
      "name": "旧照片",
      "box": [
        40,
        40,
        80,
        80
      ],
      "views": [
        {
          "text": "少年白墨站在圆顶前。背面字迹：",
          "note": "「2018 夏 · 第一次值夜。若有孩子被关，请让谜题带他们回家。——白」\n旁边涂鸦 2020 是后来参观者写的，无关。"
        }
      ]
    },
    {
      "id": "desk",
      "name": "书桌抽屉",
      "box": [
        80,
        120,
        200,
        90
      ],
      "views": [
        {
          "if": [
            "!desk_ok"
          ],
          "text": "抽屉有简单数字锁。便签：",
          "note": "【算一算】书架有 24 本星图册，每层 6 本，有几层？\n24 ÷ 6 = ?",
          "lock": {
            "kind": "num",
            "len": 1,
            "answer": "4",
            "prompt": "输入层数",
            "ok": {
              "set": [
                "desk_ok"
              ],
              "text": "4！抽屉打开。"
            },
            "bad": "24 ÷ 6。"
          }
        },
        {
          "if": [
            "desk_ok",
            "!took_note"
          ],
          "text": "抽屉里有一封信和半枚金星钥。",
          "take": {
            "give": [
              "truth_note",
              "star_key4"
            ],
            "set": [
              "took_note"
            ],
            "text": "信写着：「我是白墨，后来的林馆长。星钥系统是防走失的游戏，也是真应急通道。潮汐门钥匙在保险箱。」"
          }
        },
        {
          "text": "抽屉空了。"
        }
      ]
    },
    {
      "id": "safe",
      "name": "保险箱",
      "box": [
        300,
        50,
        70,
        90
      ],
      "views": [
        {
          "if": [
            "!safe_ok"
          ],
          "text": "保险箱字母锁。信的末行提示：",
          "note": "【英语】My name in English badge was _____ .\n（白墨姓林：LIN，3 字母）\n干扰：BAI、MO。",
          "lock": {
            "kind": "alpha",
            "len": 3,
            "answer": "LIN",
            "prompt": "输入姓氏拼音",
            "ok": {
              "set": [
                "safe_ok"
              ],
              "give": [
                "master_key"
              ],
              "text": "LIN！潮汐门钥匙躺在绒布上。"
            },
            "bad": "林馆长的姓：LIN。"
          }
        },
        {
          "if": [
            "safe_ok"
          ],
          "text": "保险箱开着，钥匙已拿走。"
        }
      ]
    },
    {
      "id": "shelf",
      "name": "星图书架",
      "box": [
        300,
        160,
        70,
        100
      ],
      "views": [
        {
          "text": "24 本星图册，正好 4 层。夹页写着：潮汐门密码前两位是 15。",
          "note": "【线索】前两位 15；圆顶纸条后两位 37 → 1537。\n干扰夹页写着 8848、2024。"
        }
      ]
    },
    {
      "id": "door",
      "name": "潮汐门廊门",
      "box": [
        40,
        160,
        50,
        100
      ],
      "views": [
        {
          "if": [
            "!safe_ok"
          ],
          "text": "需要潮汐门钥匙才能进门廊。",
          "wrong": "先开保险箱。"
        },
        {
          "if": [
            "safe_ok"
          ],
          "text": "用潮汐门钥匙。",
          "use": [
            {
              "item": "master_key",
              "win": true,
              "text": "钥匙转动——门廊灯逐盏点亮，尽头是巨大的潮汐门。真相已明：白墨一直在守护迷路的孩子。"
            }
          ],
          "wrong": "用潮汐门钥匙。"
        }
      ]
    }
  ],
  "combos": [],
  "hints": [
    {
      "until": "desk_ok",
      "obj": "desk",
      "tiers": [
        "开书桌抽屉。",
        "24 ÷ 6。",
        "4。"
      ]
    },
    {
      "until": "took_note",
      "obj": "desk",
      "tiers": [
        "拿信和金星钥。",
        "点抽屉。",
        "拿起。"
      ]
    },
    {
      "until": "safe_ok",
      "obj": "safe",
      "tiers": [
        "保险箱是姓氏拼音。",
        "林 → LIN。",
        "输入 LIN。"
      ]
    },
    {
      "until": "escaped",
      "obj": "door",
      "tiers": [
        "用潮汐门钥匙开门廊。",
        "选中钥匙点门。",
        "前往终章！"
      ]
    }
  ],
  "explain": [
    "24÷6=4 开抽屉，读白墨=林馆长的信。",
    "LIN 开保险箱得潮汐门钥匙。",
    "书架提示出门码前两位 15（终章用）。",
    "钥匙进入潮汐门廊。"
  ],
  "solution": [
    [
      "code",
      "desk",
      "4"
    ],
    [
      "take",
      "desk"
    ],
    [
      "code",
      "safe",
      "LIN"
    ],
    [
      "use",
      "door",
      "master_key"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#1a1820')+R(0,220,400,80,'#2a2830');
s+=g('desk',R(80,120,200,90,'#5a4030',8,SK)+T(180,170,12,'书桌',' fill="#cde"'));
s+=g('photo',R(40,40,80,80,'#e8e0d0',4,SK)+T(80,80,11,'照片',' fill="#3a2a1a"'));
s+=g('safe',R(300,50,70,90,'#3a3a48',6,SK)+T(335,100,11,'保险箱',' fill="#9ab"'));
s+=g('shelf',R(300,160,70,100,'#4a3a28',6,SK)+T(335,220,11,'书架',' fill="#9ab"'));
s+=g('door',R(40,160,50,100,f.door_ok?'#2a6a4a':'#334',6,SK)+T(65,275,11,'潮汐门廊',' fill="#9ab"'));
return s;}
});
ROOMS.push({
  "id": "r10",
  "title": "潮汐大门",
  "emoji": "🚪",
  "sub": "终章 · 夜尽星明",
  "story": [
    "潮汐门高耸，像两扇合拢的蚌壳。密码盘冷光闪烁。",
    "你已知道白墨是林馆长，星钥是他留给迷路孩子的路标。",
    "输入正确出门码，拧动钥匙，回家。"
  ],
  "objects": [
    {
      "id": "board",
      "name": "最终提示板",
      "box": [
        20,
        40,
        90,
        80
      ],
      "views": [
        {
          "text": "提示板汇总：",
          "note": "【汇总】书架：前两位 15。\n圆顶纸条：后两位 37。\n完整出门码：1537\n【干扰】有人写 2018、1584、8848——那是别的房间的数。"
        }
      ]
    },
    {
      "id": "box",
      "name": "工具匣",
      "box": [
        20,
        160,
        80,
        50
      ],
      "views": [
        {
          "if": [
            "!box_ok"
          ],
          "text": "工具匣转盘：",
          "note": "【成语填空】守 株 待 ___\n（比喻不主动努力）",
          "lock": {
            "kind": "dial",
            "opts": [
              [
                "兔",
                "鸟",
                "鱼",
                "羊",
                "狗",
                "马"
              ]
            ],
            "answer": "兔",
            "prompt": "转到缺字",
            "ok": {
              "set": [
                "box_ok"
              ],
              "give": [
                "master_key"
              ],
              "text": "“兔”！匣里是潮汐门钥匙（林馆长又备了一把）。"
            },
            "bad": "守株待___。"
          }
        },
        {
          "if": [
            "box_ok"
          ],
          "text": "工具匣空了。"
        }
      ]
    },
    {
      "id": "pad",
      "name": "密码盘",
      "box": [
        300,
        200,
        80,
        50
      ],
      "views": [
        {
          "if": [
            "!pad_ok"
          ],
          "text": "四位出门密码：",
          "note": "看最终提示板。",
          "lock": {
            "kind": "num",
            "len": 4,
            "answer": "1537",
            "prompt": "出门码",
            "ok": {
              "set": [
                "pad_ok"
              ],
              "text": "1537！密码锁松开，钥匙孔露出来。"
            },
            "bad": "15 与 37 拼起来。"
          }
        },
        {
          "if": [
            "pad_ok"
          ],
          "text": "密码已开，去拧潮汐门。"
        }
      ]
    },
    {
      "id": "gate",
      "name": "潮汐门",
      "box": [
        120,
        40,
        160,
        180
      ],
      "views": [
        {
          "if": [
            "!pad_ok"
          ],
          "text": "门很重。先解开旁边密码盘。",
          "wrong": "先解密码盘。"
        },
        {
          "if": [
            "pad_ok"
          ],
          "text": "密码锁已开，钥匙孔亮着。",
          "use": [
            {
              "item": "master_key",
              "win": true,
              "text": "钥匙一转——潮汐门缓缓打开。馆外晨光微露。林馆长（白墨）站在台阶下，笑着递来你的水杯：「演练完成。你是今晚最棒的观星员。星钥会一直为迷路的人亮着。」"
            }
          ],
          "wrong": "用潮汐门钥匙。"
        }
      ]
    }
  ],
  "combos": [],
  "hints": [
    {
      "until": "box_ok",
      "obj": "box",
      "tiers": [
        "开工具匣拿备用钥匙。",
        "守株待___。",
        "兔。"
      ]
    },
    {
      "until": "pad_ok",
      "obj": "board",
      "tiers": [
        "看提示板拼密码。",
        "15 + 37。",
        "1537。"
      ]
    },
    {
      "until": "escaped",
      "obj": "gate",
      "tiers": [
        "用钥匙开潮汐门。",
        "选中钥匙点门。",
        "逃出！"
      ]
    }
  ],
  "explain": [
    "「守株待兔」开工具匣得钥匙。",
    "出门码 1537（书架 15 + 圆顶 37）。",
    "钥匙打开潮汐门，林馆长揭晓白墨身份，你安全离开。"
  ],
  "solution": [
    [
      "code",
      "box",
      "兔"
    ],
    [
      "code",
      "pad",
      "1537"
    ],
    [
      "use",
      "gate",
      "master_key"
    ]
  ]
,
  "art": function(f){var s='';
s+=R(0,0,400,300,'#0a1020')+R(0,200,400,100,'#152030');
s+=g('gate',R(120,40,160,180,'#3a4a66',8,SK)+R(140,60,50,140,'#2a3548',4)+R(210,60,50,140,'#2a3548',4)+C(200,130,10,f.escaped?'#2a8a4a':'#8a2a2a')+T(200,240,12,'潮汐门',' fill="#cde"'));
s+=g('pad',R(300,200,80,50,'#333',6,SK)+T(340,225,11,'密码盘',' fill="#aaa"'));
s+=g('board',R(20,40,90,80,'#f4efe0',6,SK)+T(65,80,12,'最终提示',' fill="#3a2a1a"'));
s+=g('box',R(20,160,80,50,'#5a4a38',6,SK)+T(60,190,11,'工具匣',' fill="#cde"'));
return s;}
});
G.PZ_ROOMS=ROOMS;
})(typeof window!=='undefined'?window:globalThis);
/*ROOMS-END*/