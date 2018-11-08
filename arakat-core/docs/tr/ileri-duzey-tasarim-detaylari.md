## İleri Düzey Tasarım Detayları

### İçerik
* [Nod Özellikleri (Node-Specs)](#nod-özellikleri-node-specs)
    * Genel Özellikler
    * Parametre Özellikleri (parameter_props)
* [Parametre Formatı](#parametre-formatı)
* [Nod Aileleri](#nod-aileleri)
* [*Code Generation Utils*](#code-generation-utils)
* [*Shared Functions*](#shared-functions)
* [*Multi-instance Handler*](#multi-instance-handler)
* [*Model Holder*](#özel-durumlar-model-holder-case)
* [*Edge Permissions*](#edge-permissions)

### Nod Özellikleri (Node-Specs)

Nod özellikleri 2 kritik kategoride incelenebilir: genel özellikler, parametre özellikleri (ve parametreler üzerindeki kıstaslar/limitler).

**Genel Özellikler**

* node_id
* name
* node_type
* category
* family
* compatible_with_stream
* compatible_stream_output_modes
* compatible_with_spark_pipeline
* is_splitter
* produces_model

Genel özellikler, tüm nodlarda ortak olarak bulunmaktadır. Gerek core modülün gerekse diğer modüllerin işlev görebilmeleri için gereklidirler.

UI tarafından graph'taki nodlara da id verilmektedir ve bunlar *id* field'ında tutulmaktadırlar. Bir *id* yalnızca graph'taki tek bir nodu ifade eder. *node_id*, nodun hangi tür nod olduğunu ifade eder (Örneğin, RandomForestClassifier). Graph üzerinde, aynı *node_id*'ye ait birden fazla nod yer alabilir. *node_type*, nodun hangi üst seviye nod türünden (*higher-level-node-type*) geldiğini ifade eder.

**Mevcut versiyonda yer alan *higher-level-node-type*'lar şunlardır:**
* **INNER_NODE:** İçerisinde başka nodlar barındıramayan nodları kapsar.
* **PIPELINE_NODE:** Spark *pipeline*'ları ile uyumlu (*INNER_NODE* türündeki) nodları barındırabilir.
* **CV_NODE:** İçerisinde *estimator* ve *evaluator* nod ailelerinden gelen nodları barındırır. Bu ailelerden yalnızca birer nod barındırabilir.
* **TASK_NODE:** Task nodlarını belirtmek için kullanılır. İçerisinde, farklı üst seviye nod türlerinde (*INNER_NODE*, *PIPELINE_NODE*, *CV_NODE*) nodlar bulunmasına olanak sağlar.
* **NO_NODE:** Yer-tutucu olarak görev yapan noddur. Task nodların *parent* nodları olmadığı için bu nodların *parent*'larını ifade etmek için kullanılır.

***UYARI:*** *node_id* yerine *node_type*, *node_type* yerine *node_high_level_type* terimine geçilebilir.

**Parametre Özellikleri (parameter_props)**

Parametre özellikleri, nodu gerçeklemek için ihtiyaç duyulan parametrelerin neler olduğunu ve sağlandığında nasıl işleneceklerine/kontrol edileceklerine dair bilgileri içerir.

*parameter_props* 3 temel (1 opsiyonel) eleman barındırır:

```json
{"parameters": {}, "relational_constraints": [], "visibility_constraints": [], "lookup_table": {}}
```

**parameters**, sağlanması gereken parametrelerin detaylarını; **relational_constraints**, parametreler arası kıstasları; **visibility_constraints**, UI tarafında parametre girişi sırasında izlenmesi istenen davranışları içerir. Kıstaslar, parametreler altındaki değerlere referans verme ihtiyacı duyduklarında bunları *lookup_table* altında tutarlar. Bu nedenle, *lookup_table* opsiyoneldir.

***parameters:***

*parameters* altında parametreler **key-value pair**'leri şeklinde tutulurlar. Her *parametre* için bir **visible_name** ve **type_constraint** tanımlanması zorunludur. *visible_name* parametrenin görünür adıdır (Örneğin, UI'da parametre alınırken kullanıcıya gösterilecek parametre adı *visible_name*'den alınabilir). Bir parametre farklı türde değerler alabilir (Örneğin, kullanıcı bir önişleme işleminin uygulanacağı kolon veya kolonları belirtmek için string veya string array'i girebilir. Buna ek olarak, çok fazla kolon adı sözkonusu ise template, regex veya ALL türlerini kullanabilir. *Node-spec* oluşturulurken nodun her parametre için destekleyebileceği veri türleri (*data_type*) belirlenmelidir).

Parametre üzerinde (yalnızca bu parametreye etki eden) kıstaslar (**set_constraint**) tanımlanabilir. Bu kıstaslar, parametrenin alabileceği değer kümesini sınırlar. Örneğin, *RandomForestClassifier*'ın *impurity* parametresi yalnızca *entropy* ve *gini* değerleri alabilmektedir. Bunların dışında girilen değerler graph'ın kontrol aşamasında *set_constraint* kullanılarak tespit edilebilir. Yine de *set_constraint* kullanıldığı durumlarda, UI'ın kullanıcıyı serbest bırakmak yerine, yalnızca parametre için girilebilecek değerleri sunması daha etkin olacaktır (Örneğin, *set_constraint* altında yer alan değerler bir dropdown-box'ta kullanıcıya sunulabilir).

Parametre üzerinde kıstaslar belirtmek için **piecewise_constraint**'ler de tanımlanabilmektedir. Bunlar, sayısal değerlerin istenen aralıklarda olmasını sağlamak amacıyla kullanılır.

***Örnek:***
"piecewise_constraint": "subsamplingRate > 0.0 AND subsamplingRate <= 1.0"

*piecewise_constraint* için kullanılan DSL, temel mantık ifadelerinin oluşturulması için ==, <, >, !=, >=, <= gibi operasyonlar ile AND ve OR gibi operasyonlar üzerinde kurulmuştur. **Mevcut versiyonda, sözkonusu DSL henüz son halini almamıştır.**

Parametre için *default* değer verilebilir. Kullanıcı nod için parametre gireceği ekranda kullanıcıya sözkonusu parametre için default değeri gösterebilir. Kullanıcı, sözkonusu parametre için farklı bir değer girmediği durumda *default* değer kullanılır.

Parametreler opsiyonel de olabilmektedirler. *optional* değeri True olarak verilerek bu node-spec'lerde belirtilir. *optional* değeri True olmadığı durumlarda, *optional* değerinin False olarak belirtilmemesi gerekmektedir (node-spec'te parametre için optional True ibaresi bulunmuyorsa, o parametre zorunlu kabul edilir). Opsiyonel parametreler için kullanıcı değer girmediği durumlarda, bu parametre nod'a eklenmez (Örneğin, nod'un parametreleri altında bu opsiyonel parametrenin adı ve null değeri yer almamalıdır).

**special_requirements**, üst seviye veri türlerinin (*template*, *regex*, *ALL*, *dict* vb.) nasıl işlenmesi gerektiğine dair bilgileri taşır. Örneğin, regex olarak girilen bir parametrenin (konseptsel olarak) bir veri tablosu üzerinde eşleştiği kolonları getirmesi beklenebilir. Bir başka deyişle, parametrenin aldığı değer bir iş-mantığı ile birleşerek parametrenin gerçek değerini oluşturur. Bu iş mantığını, parametre için sağlanan değeri nasıl kullanmamız gerektiğini belirttiğimiz *special_requirements*'lar ile saptarız. *special_requirements*, hangi veri türünde hangi iş mantığını uygulamamız gerektiği bir *dictionary*'dir.

Üst seviye veri türlerinin (*template*, *regex*, *ALL*, *dict* vb.) array'lerine ihtiyaç duyulduğunda, array içerisinde yer alan türe ait iş mantığı belirtilir. Referans örneklerden *UDF* noduna göz atalım: Örneğin, *udf_input_tuples* parametresi altındaki "array[regex]" için gerekli *special_requirement* "array[regex]" olarak değil de array'i oluşturan elemanların türü için (bu durumda regex) tanımlanmıştır. İfade edilen ise, array'in içerisnde yer alan regex türündeki elemanları değerlendirirken *special_requirement* altındaki "regex" keyword'ü ile belirlenen iş-mantığı kullanılmalıdır.

**Veri türleri (data_types):**

* primitives (string, integer, float, boolean vb.)
* object
* N-D array (primitive veya object array'leri)
* dict
* regex
* template
* code
* ALL

*primitives:*

Basit veri türleridir. Tek başlarına kullanılabildikleri gibi *array* ve *object* gibi türler altında da kullanılabilirler. Üzerlerinde *set_constraint* ve *piecewise_constraint* tanımlanabilir.

*object:*

Kompleks parametreleri ifade etmek için kullanılır. Bir object içerisinde başka *object*'ler de yer alabilir. 

Referans örneklerden, *RollingStatistics* noduna göz atalım:
*rolling_stats_info* parametresi yalnızca *object* türünde bir değer alabilmekte. Bu *object*'in yapısı hakkında bilgi *object_info* (object'leri ifade etmek için ayrılmış keyword) altında açıklanmakta. *object_info*'ya baktığımızda, "between_operation", "first_argument" ve "second_argument" isimli 3 parametre olduğunu görüyoruz.

"between_operation", string türü değer alabilen, üzerinde set_constraint tanımlanmış ve bir default değer taşıyan bir parametre.

"first_argument", object türünde değer alabilen komplex bir parametre. Sözkonusu object değerine ait object bilgisi ise "first_argument" altındaki object_info'da paylaşılmış. Bunu incelediğimizde ise "operation" ve "input_cols" olmak üzere 2 parametre görüyoruz. "operation" string değer alan basit bir parametre iken, "input_cols" *array[string]*, *regex* ve *template* türünde değerler alabilen ve özel gereksinimleri (*special_requirements*) olan bir parametre.

"second_argument" de "first_argument"'e benzer bir yapı taşımakta.

*object*, iç içe geçmiş (*nested*) parametrelerin ifade edilmesi için kullanılmaktadır.

*N-D array:*

Parametrenin belirli bir veri türünden bir dizi alabildiğini ifade etmek için kullanılır. Örneğin, "array[string]" parametrenin bir string array'i aldığını ifade ederken "array[object]" parametrenin bir object array'i aldığını ifade eder. Mevcut versiyonda, bir parametrenin alabileceği veri türleri içerisinde yalnızca tek bir *object* ve *array[object]*'e izin verilmektedir.

Referans örneklerden *UDF* noduna göz atalım:
*udf_input_tuples* parametresi "array[array[string]]", "array[regex]", "array[template]", "array[ALL]" türünde değerler alabilmektedir. Bunlardan ilki 2D-array'ken diğerleri 1D array'lere örnektir.

*dict:*

Parametrenin *dictionary* şeklinde değer alabilmesi için kullanılır. *dict* veri türünün kullanılabilmesi için *special_requirement* belirtilmelidir.

Referans örneklerden *BatchReadFromCSV* nodunu inceleyelim:
Burada schema parametresi *dict* türünde değerler alabilmekte. Belirtilen *special_requirement* ise sağlanan *dict* değerinin bir "schema" olarak değerlendirilmesi gerektiğidir. Bu şekilde, bu parametrenin taşıdığı dict değeri doğrudan kullanılmamakta; bunu anlamlandıran "schama" mantığına göre *dict* türündeki değer alınıp nodun ihtiyaç duyduğu schema formatında bir değere dönüştürülmektedir.

*regex:*

Parametrenin regex ifade eden bir string almasına olanak sağlamaktadır. Kullanıcı tarafından alınacak bu regex'in nasıl kullanılacağı ise *special_requirement* olarak belirlenir.

Referans örneklerden *RollingStatistics* nodunu ele alalım:
"first_argument* parametresine ait *input_cols* parametresinin türü "array[string]", "regex" ve "template" olabilmektedir. Bu nodun ve parametrenin konsepti gereği *input_cols* veri tablosu üzerinde seçilecek girdi kolonlarının belirlenmesi için kullanılmaktadır. Bu durumda, kullanıcı bir string listesi, kolonları filtreleyeceği bir regex veya kolon adlarını oluşturabileceği bir template girebilir. *input_col* parametresi işlenirken, regex'in hangi iş-mantığı ile kullanılacağı bilinmelidir. Bu örnekte, "column_selector_regex" adlı bir iş-mantığına ihtiyaç duyulmaktadır. Bu iş-mantığı, üzerinde çalışılan veri tablosundan regex ile eşleşen kolonları bulup parametrenin son değerini elde etmeyi amaçlamaktadır.

*template:*

Eğer parametre değeri çok sayıda eleman içeriyorsa ve bu elemanlar ortak bir *pattern* ile ifade edilebiliyorsa; tüm elemanları teker teker sağlamak yerine *template* kullanarak bu elemanların sözkonusu *pattern*'a göre oluşturulmasını sağlayabiliriz. Bu şekilde, kullanıcı onlarca değeri tek bir template ile ifade edebilir.

Referans örneklerden *RollingStatistics* nodunu ele alalım:
"first_argument* parametresine ait *input_cols* parametresinin türü "array[string]", "regex" ve "template" olabilmektedir. Bu nodun ve parametrenin konsepti gereği *input_cols* veri tablosu üzerinde seçilecek girdi kolonlarının belirlenmesi için kullanılmaktadır. Bu durumda, kullanıcı bir string listesi, kolonları filtreleyeceği bir regex veya kolon adlarını oluşturabileceği bir template girebilir. *input_col* parametresi işlenirken, regex'in hangi iş-mantığı ile kullanılacağı bilinmelidir. Bu örnekte, "column_selector_regex" adlı bir iş-mantığına ihtiyaç duyulmaktadır. Bu iş-mantığı, üzerinde çalışılan veri tablosundan regex ile eşleşen kolonları bulup parametrenin son değerini elde etmeyi amaçlamaktadır.

*code:*

Platformun kabiliyetlerini ve esnekliğini daha ileriye götürmek adına, kullanıcının kendi kodlarını (şimdilik yalnız *pure functions*) ekleyebilmesine olanak tanınmıştır. Bu da, *code* türü parametre'ler ile gerçeklenmektedir. Sözkonusu parametre de *special_requirements* altında
gerekli iş-mantığının belirtilmesini beklemektedir. Referans örneklerden, *UDF* noduna ait node-spec'te *udf_function* parametresinde örnek kullanım bulunabilir.

*ALL:*

Bir parametrenin alabileceği değer havuzunun belirli veya saptanabilir olması durumunda, tüm değerler seçilmek istendiğinde; bu değerlerin hepsini teker teker sağlamak yerine, *ALL* değeri verilebilir. Bu parametre türü de ilgili iş-mantığının belirtilmesini gerektirmektedir. Referans örneklerden *UDF* nodunda yer alan *udf_input_tuples* parametresinde *ALL* parametre türünün örneği bulunabilir. Bu örnek, *ALL* değeri verildiğinde sözkonusu veri tablosunda yer alan tüm kolonların seçilmesini için gerekli iş-mantığının gerçeklenmesini hedefler.

***relational_constraints:***

Birden fazla parametre üzerinde kıstas tanımlanmak istendiğinde *relational_constraints* kullanılabilir. Bir ya da daha fazla kıstas tanımlanmasına olanak sağlanmıştır. **Mevcut sürümde, halihazırdaki DSL son halini almamıştır.**

***Örnek:***

```json
"relational_constraints": [
    "(((v1 == v2) AND (v3 == v2)) => (v4 == v5)) AND (((v6 == v2) AND (v3 == v2)) => (v7 == v5))"
]
```

Yukarıda paylaşılan *relational_constraints*, *RollingStatistics* nodundan alınmıştır. v1, v2... *placeholder*'ları *lookup_table* tanımlanmıştır. Bu kıstas değerlendirilirken, *lookup_table*'da yer alan referans değerlere ulaşılmalı ve istenen mantık ifadesi *evaluate* edilmelidir. Bu DSL, *piecewise_constraint* ile aynıdır.

***visibility_constraints:***

Bu kıstaslar, UI ihtiyaçları için sağlanmıştır. Özellikle, hangi parametrelerin birbiri ile gösterilmesi gerektiği veya bir parametre spesifik bir değer aldığında diğer parametrelere ait görsel bileşenler nasıl etkileniyor gibi durumları tasvir etmek için kullanılabilirler. Bir ya da daha fazla *visibility_constraint* tanımlanabilmektedir.

*visibility_constraints* iki parçadan oluşmaktadır: *condition* ve *action*.

*condition*, sözkonusu kıstası oluşturan durumu ifade eder. Bu durum, *relational_constraints* için kullanılan DSL ile karşılanabilmektedir.

*action*, sözkonusu durum oluştuğunda nasıl müdahale edilmesi gerektiğine dair bilgiyi içerir. Referans örneklerden *RollingStatistics* noduna bakalım. Burada, v8 ve v9 ile ifade edilen değerlerin aynı olması durumunda "second_argument" parametresini ifade eden görselin saklanması gerektiği belirtilmiştir. Mevcut vesiyonda, yalnızca *set_visible* ve *hide* *action'ları sağlanmıştır.

***lookup_table:***

*lookup_table*, *visibility_constraints* ve *relational_constraints*'leri daha sade yazabilmek adına oluşturulmuştur. *lookup_table*, *placeholder* ve bunların taşıyacağı değerlere nasıl ulaşacağına dair bilgiler taşır. Temelde *placeholder*'ların alabileceği 2 tür değer vardır: *variables* (ki bunlar parametrelerin aldıkları değerlere dair özelliklerden gelir) ve *constants* (sabit değerler).

Referans örneklerden *RollingStatistics* noduna bakalım.

***Örnek 1:***
```json
"v9": {
        "const": "Identity"
      }
```

Örnek 1, *constant* kullanımını örneklemektedir. *constant*'lar için *const* keyword'ü kullanılır.

***Örnek 2:***
```json
"v3": {
        "trace": "new_column_names",
        "field": "type"
    },
"v7": {
        "trace": "rolling_stats_info-object_info-second_argument-object_info-value",
        "field": "length"
    },   
"v8": {
        "trace": "rolling_stats_info-object_info-between_operation",
        "field": "value"
      },
```

Örnek 2, farklı şekillerde *variable* tutmayı örneklemektedir. *trace* keywprd'ü değerine bakılması istenen parametreye giden adımları ifade eder. Basit parametreler için *trace* v2'te olduğu gibi tek adımda bitebileceği gibi; *nested* objeler içeren parametrelerde oluşan parametre objesi içerisinde key'ler üzerinde nasıl ilerleneceği "-" ile ayrılarak belirtilmiştir. "field" ise parametrenin değerine ulaşıldığında hangi işleme tabi tutulacağını belirtmek için kullanılır. Mevcut versiyonda, "type", "length" ve "value" işlemlerine olanak sağlanmaktadır. Bunlar sırasıyla, parametreye ait değerin türünü, uzunluğunu (array'ler için geçerli) ve değerin kendisini verirler.

**Referans Örnekler**

*RollingStatistics Nodu:*
```json
{
  "node_id": 73,
  "name": "Rolling Statistics",
  "category": 6,
  "node_type": 0,
  "family": 22,
  "compatible_with_stream": false,
  "compatible_stream_output_modes": [],
  "compatible_with_spark_pipeline": false,
  "is_splitter": false,
  "produces_model": false,
  "parameter_props": {
    "parameters": {
      "rolling_stats_info": {
        "visible_name": "Rolling Stats",
        "type_constraint": ["object"],
        "object_info": {
          "between_operation": {
            "visible_name": "Between operation",
            "type_constraint": ["string"],
            "set_constraint": ["Identity", "+", "*", "-"],
            "default": "Identity"
          },
          "first_argument": {
            "visible_name": "First argument",
            "type_constraint": ["object"],
            "object_info": {
              "operation": {
                "visible_name": "Operation",
                "type_constraint": ["string"],
                "set_constraint": ["Identity", "max", "min", "mean", "std"],
                "default": "Identity"
              },
              "input_cols": {
                "visible_name": "Input columns",
                "type_constraint": ["array[string]", "regex", "template"],
                "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template"}
              }
            }
          },
          "second_argument": {
            "visible_name": "Second argument",
            "type_constraint": ["object"],
            "object_info": {
              "operation": {
                "visible_name": "Operation",
                "type_constraint": ["string"],
                "set_constraint": ["Identity", "max", "min", "mean", "std"],
                "default": "Identity"
              },
              "input_cols": {
                "visible_name": "Input columns",
                "type_constraint": ["array[string]", "regex", "template"],
                "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template"}
              }
            }
          }
        }
      },
      "output_cols": {
        "visible_name": "Output columns",
        "type_constraint": ["array[string]", "template"],
        "special_requirements": {"template": "column_selector_template"}
      },
      "partitioning_column": {
        "visible_name": "Partition by",
        "type_constraint": ["string"]
      },
      "ordering_column": {
        "visible_name": "Order by",
        "type_constraint": ["string"]
      },
      "ordering_direction": {
        "visible_name": "Ordering direction",
        "type_constraint": ["string"],
        "set_constraint": ["asc", "desc"],
        "default": "desc"
      },
      "lags": {
        "visible_name": "Lags",
        "type_constraint": ["array[integer]"],
        "piecewise_constraint": "(window_size >= 1) OR (window_size == -1)"
      }
    },
    "lookup_table": {
      "v1": {
        "trace": "rolling_stats_info-object_info-first_argument-object_info-value",
        "field": "type"
      },
      "v2": {
        "const": "array[string]"
      },
      "v3": {
        "trace": "new_column_names",
        "field": "type"
      },
      "v4": {
        "trace": "rolling_stats_info-object_info-first_argument-object_info-value",
        "field": "length"
      },
      "v5": {
        "trace": "new_column_names",
        "field": "length"
      },
      "v6": {
        "trace": "rolling_stats_info-object_info-second_argument-object_info-value",
        "field": "type"
      },
      "v7": {
        "trace": "rolling_stats_info-object_info-second_argument-object_info-value",
        "field": "length"
      },
      "v8": {
        "trace": "rolling_stats_info-object_info-between_operation",
        "field": "value"
      },
      "v9": {
        "const": "Identity"
      }
    },
    "relational_constraints": [
      "(((v1 == v2) AND (v3 == v2)) => (v4 == v5)) AND (((v6 == v2) AND (v3 == v2)) => (v7 == v5))"
    ],
    "visibility_constraints": [
      {
        "condition": "v8 == v9",
        "action": {
          "type": "set_visible",
          "trace": "expressions-object_info-second_argument"
        }
      },
      {
        "condition": "v8 != v9",
        "action": {
          "type": "hide",
          "trace": "expressions-object_info-second_argument"
        }
      }
    ]
  },
  "df_constraints": []
}
```

*UDF Nodu:*
```json
{
  "node_id": 71,
  "name": "UDF",
  "category": 2,
  "node_type": 0,
  "family": 20,
  "compatible_with_stream": false,
  "compatible_stream_output_modes": [],
  "compatible_with_spark_pipeline": false,
  "is_splitter": false,
  "produces_model": false,
  "parameter_props": {
    "parameters": {
      "udf_input_tuples": {
        "visible_name": "Input Tuples",
        "type_constraint": [
          "array[array[string]]",
          "array[regex]",
          "array[template]",
          "array[ALL]"
        ],
        "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
      },
      "udf_outputs": {
        "visible_name": "Output Columns",
        "type_constraint": [
          "array[string]",
          "template"
        ],
        "optional": true,
        "special_requirements": {"template": "column_selector_template"}
      },
      "udf_function": {
        "visible_name": "UDF Function",
        "type_constraint": [
          "code"
        ],
        "special_requirements": {"code": "code"}
      },
      "udf_return_type": {
        "visible_name": "UDF Return Type",
        "type_constraint": [
          "string"
        ],
        "set_constraint": [
          "StringType",
          "IntegerType",
          "LongType",
          "DoubleType",
          "FloatType",
          "BooleanType",
          "ArrayType"
        ]
      }
    },
    "relational_constraints": [
    ],
    "visibility_constraints": [
    ]
  },
  "df_constraints": []
}
```

*BatchReadFromCSV Nodu:*
```json
{
  "node_id": 47,
  "name": "Batch Read from CSV",
  "category": 0,
  "node_type": 0,
  "family": 0,
  "compatible_with_stream": false,
  "compatible_stream_output_modes": [],
  "compatible_with_spark_pipeline": false,
  "is_splitter": false,
  "produces_model": false,
  "can_infer_schema": true,
  "file_type": "csv",
  "parameter_props": {
    "parameters": {
      "path": {
        "visible_name": "File Path",
        "type_constraint": [
          "string"
        ]
      },
      "quote": {
        "visible_name": "Quote",
        "type_constraint": [
          "string"
        ],
        "default": "\""
      },
      "header": {
        "visible_name": "Header",
        "type_constraint": [
          "string"
        ],
        "default": false
      },
      "sep": {
        "visible_name": "Separator",
        "type_constraint": [
          "string"
        ],
        "default": ","
      },
      "schema": {
        "visible_name": "Schema",
        "type_constraint": [
          "dict"
        ],
        "optional": true,
        "special_requirements": {"dict": "schema"}
      }
    },
    "relational_constraints": [

    ],
    "visibility_constraints": [

    ]
  },
  "df_constraints": [

  ]
}
```

### Parametre Formatı

Parametre özellikleri hangi parametreleri nasıl istememiz gerektiğini belirler. Parametre formatı ise alınan parametre değerlerinin graph'a nasıl dahil edileceğini belirler. Bu bölümde farklı durumlar ve parametre türleri için izlenmesi gereken format verilecektir.

**primitives:**

*primitive* parametreler için format şu şekildedir:
```json
"parameter_name": {"value": value_of_parameter, "type": type_of_parameter}
```

*type*, mevcut *primitive* değerlerinden herhangi biri olabilmektedir.\
*value*, verilen *type* türünde herhangi bir değer olabilir.

**regex:**

*regex* parametreler için format şu şekildedir:
```json
"parameter_name": {"value": value_of_parameter, "type": "regex", "special_requirements": {"regex": regex_handler_type, ...}}
```

*type*, "regex" değerlerini alır ve string olarak verilmelidir.
*value*, regex ifade eden bir string olmalıdır.
Bunlara ek olarak, node-spec'te parametre için belirtilmiş "special_requirements" da bu parametrenin bilgisine eklenmelidir. Bu şekilde, özel parametrelerin nasıl ele alınacağı belirlenmiş olur. (Tüm "special_requirement" bilgisi aktarılabileceği gibi sadece verilen *type*'a ait bilgi de aktarılabilir.)

**template:**

*template* parametreler için format şu şekildedir:
```json
"parameter_name": {"value": value_of_parameter, "type": "template", "special_requirements": {"template": template_handler_type, ...}}
```

*value_of_parameter* için izlenecek format şu şekildedir:
```json
"value": [part_object]
```

*part_object* 2 farklı yapıda olabilir:\
1) array
    * {"value": ["str1", "str2", ...], "type": "array"}
2) range
    * {"value": {"start": start_val, "end": end_val}, "type": "range"}

*template* parametresi, çok sayıda eleman içeren bir değeri, eğer belirli bir *pattern* varsa, kolayca oluşturmayı hedefler. Bu doğrultuda, *pattern*'ı oluşturan parçalar verilmelidir. Bu parçalar, *array* veya *range* içerebilirler. Örneğin, ["str1_1_", "str1_2_"], range(3-6), ["_str2_1", "_str2_2", "_str2_3"] ile oluşturacak değer listesi şu şekildedir:\
[\
 "str1_1_3_str2_1", "str1_1_3_str2_2", "str1_1_3_str2_3",\
 "str1_1_4_str2_1", "str1_1_4_str2_2", "str1_1_4_str2_3",\
 "str1_1_5_str2_1", "str1_1_5_str2_2", "str1_1_5_str2_3",\
 "str1_2_3_str2_1", "str1_2_3_str2_2", "str1_2_3_str2_3",\
 "str1_2_4_str2_1", "str1_2_4_str2_2", "str1_2_4_str2_3",\
 "str1_2_5_str2_1", "str1_2_5_str2_2", "str1_2_5_str2_3",\
 ]

*part_object* içinde yer alan array türü template'e has bir terimdir, parametre özelliklerinde yer alan array ile karıştırılmamalıdır. İleride, bu karışıklığın önüne geçmek için farklı bir terim kullanılabilir.

*part_object* türü array ise *value* bir string array'i almalıdır. Eğer range ise, başlangıç ve bitiş değerleri integer türünde verilmelidir. Bitiş değeri exclusive'dir: [start_val, end_val)

*part_object* sayısı için bir sınır bulunmamaktadır.

Bunlara ek olarak, node-spec'te parametre için belirtilmiş "special_requirements" da bu parametrenin bilgisine eklenmelidir. Bu şekilde, özel parametrelerin nasıl ele alınacağı belirlenmiş olur. (Tüm "special_requirement" bilgisi aktarılabileceği gibi sadece verilen *type*'a ait bilgi de aktarılabilir.)

**code:**

Bazı nodlar kod parçaları sağlanmasına ihtiyaç duymaktadır (Ör: UDF nodu). Bu durumlarda, kod parçası alınmasına yarayan parametreler bulunmaktadır. Bunları türü *code* olarak ifade edilir. Parametrenin alacağı değer girilmek istenen fonksiyondur. Bu değer string ile ifade edilir. Şu an için yalnızca python'da yazılmış pure function'lara destek verilmektedir. Bununla birlikte, gerekli indentation bilgisi string içerisinde yer almalıdır; öyle ki bu string direkt oluştutulacak betiğe yapıştırılacaktır.

```json
"parameter_name": {"value": value_of_parameter, "type": "code", "special_requirements": {"code": code_handler_type, ...}}
```
*Örnek:*

```json
"udf_function": {"value": "def Cat1(num):\n\tif num <= 10: return '0-10'\n\telif 10 < num and num <= 20: return '11-20'\n\telif 20 < num and num <= 30: return '21-30'\n\telif 30 < num and num <= 40: return '31-40'\n\telse: return 'morethan40'", "type": "code", "special_requirements": {"code": "code"}}
```

Yukarıdaki örnekte code_handler_type "code"'dur. Bu şu an için arka planda sağlanan handler'ın türüdür. İleride, parametre türü ile karıştırılmaması için farklı şekilde isimlendirilebilir.

node-spec'te parametre için belirtilmiş "special_requirements" da bu parametrenin bilgisine eklenmelidir. Bu şekilde, özel parametrelerin nasıl ele alınacağı belirlenmiş olur. (Tüm "special_requirement" bilgisi aktarılabileceği gibi sadece verilen *type*'a ait bilgi de aktarılabilir.)

**dict:**

Parametre değeri olarak bir dictionary verilmek istendiğinde kullanılır.

node-spec'te parametre için belirtilmiş "special_requirements" da bu parametrenin bilgisine eklenmelidir. Bu şekilde, özel parametrelerin nasıl ele alınacağı belirlenmiş olur. (Tüm "special_requirement" bilgisi aktarılabileceği gibi sadece verilen *type*'a ait bilgi de aktarılabilir.)


Şu an için sağlanan "special_requirement" handler'lar "simple_dict" ve "schema"'dır. "simple_dict" primitive değerler içerir ve girilen dictionary'yi direkt kullanmayı hedefler. "schema" ise verilen dictionary'yi Spark dataframe'i için gerekli schema yapısına çevirir.

*dict* türü parametre için kullanılan format şu şekildedir:

```json
"parameter_name": {"value": value_of_parameter, "type": "dict", "special_requirements": {"dict": dict_handler_type, ...}}
```

*Örnek:*
```json
"fractions": {"value": {"class1": 0.1, "class2": 0.2, "class3": 0.5}, "type": "dict", "special_requirements": {"dict": "simple_dict"}}
```

```json
"fractions": {"value": {0: 0.1, 1: 0.2, 3: 0.5}, "type": "dict", "special_requirements": {"dict": "simple_dict"}}
```

**ALL**

Parametre değeri, bir set olası eleman olduğu ve bunların hepsinin seçilmesi istendiğinde kullanılabilir. Bu şekilde, tüm elemanları teker teker sağlamak yerine, ALL parametresi ile bu işlem gerçeklenebilir.

*ALL* türü parametre için kullanılan format şu şekildedir:

```json
"parameter_name": {"value": true, "type": "ALL", "special_requirements": {"ALL": ALL_handler_type, ...}}
```

Mevcut durumda, bir dataframe'in tüm kolonlarını alabilmek için kullanılan "column_selector_ALL" handler'ı bulunmaktadır.

**object:**

*object* türündeki parametreler mevcut nested yapılarını korumalıdırlar. *RollingStatistics* nodunun spec'inde yer alan "rolling_stats_info" parametresine bakalım. Bu parametrenin türü object'tir ve içerisinde farklı türde parametreler içermektedir. Bu parametreye karşılık gelen parametre değeri için şöyle bir örnek olabilir:

```json
"rolling_stats_info":
{
"value": {
    "between_operation": {"value": "-", "type": "string"},
    "first_argument":{
        "value":
            {
            "operation": {"value": "Identity", "type": "string"},
            "input_cols": {
                "value": [
                    {"value": ["pca_"], "type": "array"},
                    {"value": {"start": 1, "end": 21}, "type": "range"},
                    {"value": ["_warn"], "type": "array"},
                ],
                "type": "template",
                "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template"}
                }
            },
        "type": "object"
    }
    ,
    "second_argument": {
        "value":
            {
            "operation": {"value": "mean", "type": "string"},
            "input_cols": {
                "value": [
                    {"value": ["pca_"], "type": "array"},
                    {"value": {"start": 1, "end": 21}, "type": "range"},
                    {"value": ["_warn"], "type": "array"},
                ],
                "type": "template",
                "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template"}
                }
            },
        "type": "object"
    },
    "output_cols": {
        "value": [
            {"value": ["pca_"], "type": "array"},
            {"value": {"start": 1, "end": 21}, "type": "range"},
            {"value": ["_warn_rollingdiff_"], "type": "array"}
        ],
        "type": "template",
        "special_requirements": {"template": "column_selector_template"}
    },
    "partitioning_column": {"value": "pCol", "type": "string"},
    "ordering_column": {"value": "oCol", "type": "string"},
    "ordering_direction": {"value": "desc", "type": "string"},
    "lags": {"value": [3,7,14,30,90], "type": "array[integer]"}
},
"type": "object"
}
```

Örnekte de görüldüğü üzere, object'in her seviyesinde yer alan parametrelerin adı ve karşısında value, type ve gerekiyorsa special_requirements sağlanmalıdır.

**array:**

*array* türünde parametrelerin sağlanabilmesi için kullanılmaktadır. Temel format şu şekildedir:

```json
"parameter_name": {"value": value_of_parameter, "type": "array[type]"}
```

Farklı durumlar için örneklere bakalım:

array elemanlarının primitive olması durumuna bir örnek:

```json
"input_cols": {"value": ["c1", "c2", "c3"], "type": "array[string]"}
```

array elemanlarının template olması durumuna (*UDF* nodundan) bir örnek:

```json
"udf_input_tuples": 
{
  "value": [
      [
          {"value": ["c"], "type": "array"},
          {"value": {"start": 1, "end": 4}, "type": "range"}
      ],
      [
          {"value": ["c"], "type": "array"},
          {"value": {"start": 4, "end": 7}, "type": "range"}
      ]
  ],
  "type": "array[template]",
  "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}
}
```

array elemanlarının object olması durumuna (*RollingStatistics* nodundan) bir örnek:

```json
"rolling_stats_info":
{
  "value": {
      "between_operation": {"value": "-", "type": "string"},
      "first_argument":{
          "value":
              {
              "operation": {"value": "min", "type": "string"},
              "input_cols": {"value": ["c1", "c2", "c3"], "type": "array[string]"}
              },
          "type": "object"
      }
      ,
      "second_argument": {
          "value":
              {
              "operation": {"value": "Identity", "type": "string"},
              "input_cols": {"value": ["c1", "c2", "c3"], "type": "array[string]"}
              },
          "type": "object"
      },
      "output_cols": {"value": ["o1","o2","o3"], "type": "array[string]"},
      "partitioning_column": {"value": "pCol", "type": "string"},
      "ordering_column": {"value": "oCol", "type": "string"},
      "ordering_direction": {"value": "desc", "type": "string"},
      "lags": {"value": [3,7,14,30,90], "type": "array[integer]"}
  },
  "type": "object"
}
```

array elemanlarının array olması durumuna (*UDF* nodundan) bir örnek:
```json
"udf_input_tuples": 
{
  "value": [["c1", "c2"], ["c3", "c4"], ["c5", "c6"]],
  "type": "array[array[string]]",
  "special_requirements": {"regex": "column_selector_regex", "template": "column_selector_template", "ALL": "column_selector_ALL"}}
```

### Nod Aileleri

Nod aileleri platformda yer alan nodların kod üretimini ortaklamak amacıyla oluşturulmuşlardır. Bu şekilde, her nod için kod üretici yazılmaktan kaçınan sade ve kontrol edilebilir bir yapı kazanılmıştır.

**Nod Ailesi Oluşturmak için Temel Noktalar**

Nod aileleri *generate_code(args)* fonksiyonu taşımalıdır. TaskGenerator nodlar için kod üretirken sırası gelen noda ait bu fonksiyonu çağırır. Dinamik şekilde bu işlem gerçekleştirildiğinden noda özel tüm argümanlar tek bir dictionary içerisinde sunulmalıdır.

*generate_code*'a sağlanacak temel argümanlar, "node", "edges" ve "requireds_info"'dur. "node", sözkonusu noda ait sağlanan bilgileri içerir (node_specs + parameters). "edges", task'a ait tüm edge'leri içerir. "requireds_info", nodların hangi nodlardan "edge" aldığı bilgisini taşır.

Nod ailesi, herhangi bir işlemden önce nodun input nodlarının uygunluğunu kontrol eder (IncomingEdgeValidityChecker). Bununla birlikte, nod ailesi kendine has girdi edge bilgisini taşımalıdır. Örneğin: {"df_count": {1}, "model_count": {0}}, nodun yalnız bir dataframe edge'i kabul etmekteyken hiç model edge'i kabul etmez.

IncomingEdgeValidityChecker, girdi edge'leri kontrol ederken aynı zamanda buradan çıkardığı bilgileri düzenler ve nod ailesine sağlar. Bu şekilde, nod ailesi kullanacağı dataframe ve model ailelerini id'ler bazında da biliyor olur.

*Not:* İleriki versiyonlarda girişte yapılan bu işelemleri ortaklamak adına decorator'lar kullanılabilir.

Nod ailelerinin code_generation utility'lerini kullanması önerilir. Bu şekilde özel parametrelerin ele alınması tek bir merkezden kontrollü olarak yapılmış olur. Aynı zamanda, kod sadeliğine de erişilmiş olur.

Nod ailesi parametreleri ele alan fonksiyonlara bazı argümanlar göndermeye ihtiyaç duyabilir. Bunlar, *node_id, input_dfs, shared_function_set, additional_local_code, errors* gibi argümanlardır.

* *node_id*, nodun UI tarafından ya da farklı şekillerde verilmiş unique id'sini ifade eder.
* *input_dfs*, noda giren dataframe id'lerini ifade eder.
* *shared_function_set*, global olarak oluşturulacak fonksiyonların bu nod tarafından ihtiyaç duyulanlarının id'lerini tutmak için kullanılır.
* *additional_local_code*, nod ailesine has local olarak eklenmesi gereken ekstra kodları tutmak için kullanılır.
* *errors*, kod üretimi sırasında karşılaşılan hataları tutmak için kullanılır.

Nod ailesi oluşan ekstra local kodları, kod üretim sürecinin sonunda oluşturduğu kodların üzerine ekler.

*generate_code*, oluşan kodları, *shared_function_set*'i ve error'ları geri döner.

Yeni eklenen nod aileleri için şu ek düzenlemeler yapılmalıdır:
* domain paketi altındaki NodeFamilyTypes'a yeni eklenen nod ailesinin bilgisi eklenmelidir.
* families.json'ına yeni eklenen nod ailesinin bilgisi eklenmelidir.
* domain paketi altında yer alan ImportInfo'ya nod ailesinin gerektirdiği *import*'lar eklenmelidir.
* Yeni error türleri gerekliyse, domain paketi altındaki ErrorTypes'a bunlar eklenmelidir.
* Yeni *shared_function* türleri gerekliyse, domain paketi altındaki SharedFunctionTypes'a bunlar eklenmelidir.
* Yeni *special_case*'ler gerekliyse, domain paketi altındaki SpecialCases'a bunlar eklenmelidir.
* Eğer nod ailesi üst seviye bir nod türü oluşturmuşsa, bu tür domain paketi altındaki HighLevelNodeTypes'a eklenmelidir.

Nod ailesi oluştururken gerek duyulan ekstra kontroller, *validity* paketi altında tanımlanabilir.

Nod ailesi için farklı parametre türlerine ihtiyaç duyulması veya kod üretimi için (ortaklanabilir) farklı (mevcut olarak desteklenmeyen) utility'lere ihtiyaç duyulması durumunda *utils.code_generation* paketi altında yer alan utility'ler düzenlene bilir veya yenileri eklenebilir.


### *Code Generation Utils*

*utils.code_generation* altında yer alan CodeGenerationUtils bünyesinde kod üretimini sadeleştirecek fonksiyonlar sağlamaktadır. Temel olarak, fonksiyonların (şu an için Spark fonksiyonları) alacağı parametrelerin önişlemesi ve gerekli ekstra kodların oluşturulmasından sorumludurlar.

Parametrelerin ele alınması için sağlanan fonksiyonalite, primitive ve array türlerini ele aldığı gibi özel gereksinimleri olan parametreleri de işler. Parametrenin primitive olduğu bilindiği durumlarda primitive'i işlemek için kullanılabilecek daha sade bir fonksiyon da mevcuttur.

Parametrelerin isimleri ile birlikte argüman string'ine dönüştürülebilmesi için de fonksiyonlar sağlanmıştır. Öyle ki bir parametre dictionary'si verildiğinde "param_name1=processed_param_val1, param_name2=processed_param_val2, ..." formatında bir string oluşturulmasına imkan tanınmıştır.

Bir object-instantination veya function-call için kod üretimi gerektiği durumlarda parametre dictionary'si, başlangıç string'i ve argümanlar verilerek istenen kod üretimi gerçeklenebilir.

*Örnek:*

```python
code=CodeGenerationUtils.handle_instantination_or_call(node["parameters"], 'estimator_' + node["id"] + ' = ' + node["estimator_name"] + '(', args)
```
args içeriği ise şu şekilde olabilir:
```python
args = {"node_id": node["id"], "input_dfs": [df_name], "shared_function_set": shared_function_set, "additional_local_code": additional_local_code, "errors": errors}
```

Bunlara ek olarak, nod ailesinin ürettiği ana kod ve ekstra local kodun birleştirilmesini sağlayacak fonsiyonalite de sağlanmıştır.

Özel gereksinimi olan parametreler ise SpecialRequirementHandlerForParameters'a yönlendirilir. Burada, node-spec'te yer alan "special_requirements" bilgisinde parametre türüne karşılık gelen "handler" seçilerek parametre işlenir. Söz konusu handler'lar ekstra local kod üretebileceği gibi *shared function*'lar da üretbilirler. Handler'lar sadece parametre değeri olarak kullanılacak string'i dönerler. Üretilen ekstra local kodları ve *shared function*'ları SpecialRequirementHandlerForParameters'ın *handle_parameter(parameter, special_requirement, args)* fonksiyonu ile gönderilen arg'ın içinde yer alan gerekli alanlara koyarlar.

### *Shared Functions*

Nod aileleri hedefledikleri fonksiyonaliteleri gerçekleştirebilmek için ekstra kodlar üretmeye ihtiyaç duyabilirler. Örneğin, dataframe'den belli bir template veya regex'e uygun kolonların listesini alıp bir fonksiyona argüman olarak vermek istediğimizi düşünelim. Bu durumda, template/regex match yapacak bir fonksiyona ihtiyaç duyulmaktadır. Parametre değeri olarak da bu fonksiyonu gerekli argümanları ile call eden bir kod parçası üretmek gerekmektedir. Bu işlem, ekstra local kod üretimi için de aynı şekildedir. *Shared function*'lara ihtiyaç duyulmasının nedeni ise kodu daha sade tutmaktır. Örneğimizden devam edersek, her template match ile dataframe üzerinden kolon listesi almak isteyen parametre (bir nod ailesinde bile birden fazla olabilir) bu fonksiyonu tekrar tekrar yaratacaktır. Bunun yerine tüm nod ailelerinin kullanımı için sözkonusu işleve yönelik bir tane fonksiyon yaratmak yeterlidir.

Her nod ailesi, ihtiyaç duyduğu *shared function*'ları bir set'te tutar. Her noddan gelen bu set'ler TaskGenerator tarafından bir araya getirilir ve kodun baş kısmına sözkonusu fonksiyonlar eklenir.

Yeni *shared function*'lar, *utils.code_generation* altında yer alan "SharedFunctionStore" altına eklenebilir. İleriki versiyonlarda, "SharedFunctionStore" çok şişmesi durumunda parçalara ayrılabilir.

### *Multi-instance Handler*

Özellikle aynı işlemi birden fazla kolona uygulamak istediğimiz durumlarda, tekrar tekrar nod yaratmak gerekir. Sözkonusu kolonların çok fazla olduğu durumlarda bu kullanıcıya aşırı bir efor sarfiyatı olarak yansıyacaktır. Bunu önlemek adına, bazı nodlar (şu an için transformer ve estimator nod aileleri) için multi-instance seçeneği sunulmuştur.

Örneğin *StringIndexer* nodunu ele alalım. Spark'ın StringIndexer fonksiyonu tek bir kolon üzerinde çalışır ve kolondaki string'leri kategorize eder. Eğer mevcut dataframe üzerinde bunu uygulamak istediğimiz çok sayıda kolon varsa; bunlar için teker teker nod oluşturmak efor kaybına yol açacaktır. Bu işlevi tek bir nod ile ifade etmek istediğimizde hangi parametrelerin sabit kalıp hangilerinin multi-instance ihtiyacına göre değişeceğini saptamak gerekir. StringIndexer örneğinde input ve output kolonları tek bir string değeri alırken bunları array şeklinde ifade edip arka planda yer alan iş-mantığını da buna göre uyarlayabiliriz. Bu durumda, node-spec içerisinde *multi_instance_indicator* adında bir alan daha tutulur. Bunun içerisinde, multi-instance işlevi sırasında rehber olacak kullanılacak ve özel olarak ele alınacak parametre adları verilir.

Multi-instance handler ile arka planda yapılan bu modifiye edilmiş parametreler üzerinden bir loop dönerek daha önce manuel olarak oluşturulan nodların otomatize edilmiş bir şekilde oluşturulmasıdır.

Uyarı: Multi-instance indicator olarak kullanılacak parametreler, parameter_props'un en üst seviyesinde yer almalıdır.

### *Özel Durumlar (Model Holder Case)*

Task, pipeline ve cv nodları compound nodlardır. Bunlar içerisinde başka nodlar barındırabilirler. Temel kural olarak bir compound nod (veya bunun içerisinde yer alan nodlar) ile başka bir compound nod altında yer alan nodlar arasında bir edge bulunamaz. Yalnız, deneysel olarak ele alınan bir özel durum ile bu kabulün core modülü karmaşık hale getirmeden esnetilip esnetilemeyeceği deneyimlenmiştir. ModelHolder nodu bu deney için örnek oluşturmaktadır.

Örneğin, makine öğrenmesi yapan bir işlem akışı düşünelim. Bu durumda, veriyi ön işleyecek ve model eğitecek bir pipeline oluşturalım. Bu pipeline'ın dışında daha önceden herhangi bir önişleme işleme nodu olduğunu farz edelim. Bu nodun eğittiği modeli pipeline'ımıza dahil etmek istediğimizde iki problem çıkıyor karşımıza:

İlk problem, pipeline içerisinde daha önceden eğitilmiş bir modelin nasıl ifade edileceği. Bunu, bir "placeholder" görevi gören ModelHolder dediğimiz bir nod ile sağlayabiliriz. Bu nod, sözkonusu modeli alacak ve pipeline kodu üretilirken ifade ettiği modelin id'sini sağlayacak.

İkinci problem, yukarıda bahsedilen kabul. Bu kabule göre pipeline nodu gibi bir compound nod içerisinde yer alan bir noda, sözkonusu pipeline nodu dışarısında yer alan bir noddan edge çekmemiz gerekiyor (crossing edge problem). Bu durumda, ModelHolder durumuna özel olarak bu edge'in çekilmesine izin veriyoruz. *PipelineGenerator* graph'ı parse ederken bu edge'ler special_edges olarak ele alınmaktadır.

Bu durumun çözümü için graph parsing kısmında özel edge'leri işleyecek bir işlev ve nod ailesi içerisinde bu özel edge'leri dikkate almak yeterli oldu. Şu an için, bu şekilde özel durumların ele alınmasında bir problem görülmemiştir. Yalnız, core modülü karmaşıklaştıracak ve *dependency*'leri arttıracak özel durumlardan olabildiğince kaçınılmalıdır.

### *Edge Permissions*

*Edge Permissions*, nodlar arasında kullanılabilecek bağlantıların türünü, uyumluluğunu ve ihtiyaç duydukları ek parametrelerini belirlemek için kullanılır. Bu kurallar, gerek *validation* yapılması gerekse UI'da edge parametrelerinin yönetilmesi için kullanılabilirler.

*Edge permission*, her bir nod ailesi için yaratılır ve şu formatta olmalıdır:

```json
family_id: {
    "produces": [{"type": edge_type, "compatibility":[], "additional_parameters":[]}, ...],
    "takes": [{"type": edge_type, "compatibility":[], "additional_parameters":[]}, ...]
  }
```

*Edge permission*, bir nodun kabul ettiği girdi ve çıktı bağlanltılarının bilgilerini taşır. Bunlar, sırasıyla, "produces" ve "takes" alanlarında belirtilir. Her olası girdi ve çıktı bağlantı türü (*edge_type*) için bir object sağlanmalıdır. Bu object içerisinde, *edge_type*, *compatibility* ve *additional_parameters* alanları olabilir. Bunlardan *compatibility* ve *additional_parameters* opsiyoneldir.

Örnek'ler üzerinden inceleyelim:
```json
"6": {
    "produces": [{"type":"dataframe", "compatibility":["batch"]}, {"type":"model"}, {"type": "pipeline"}, {"type": "cv"}],
    "takes": [{"type":"dataframe", "compatibility":["batch"]}, {"type": "pipeline"}]
  }
```

Yukarıdaki örnek *Estimator* nod ailesi için gerekli *edge_permission*'dır. *Estimator* nod ailesi altındaki nodlar çıktı bağlantıları olarak "dataframe", "model", "pipeline" ve "cv" bağlantıları alabilirler. Girdi bağlantıları olarak ise yalnızca "dataframe" türü bağlantı kabul etmektedir. Yalnızca, *batch* veri taşıyan "dataframe" kabul edildiğinden "compatibility"'de sadece "batch" ibaresi yer almaktadır.

```json
"8": {
    "produces": [{"type":"dataframe", "compatibility":["batch", "stream"]}],
    "takes": [{"type":"dataframe", "compatibility":["batch", "stream"], "additional_parameters":["order"]}]
  }
  ```

Yukarıdaki örnek *Join* nod ailesi için gerekli *edge_permission*'dır. "Join" ailesi *batch* veya *stream* "dataframe"'i girdi ve çıktı olarak kabul edebilir. Yalnız, girdi olarak birden fazla "dataframe" kabul ettiğinden bunların hangi sıra ile (left-to-right) verildiğini bilmesi gerekmektedir. Bu nedenle, ekstra bilgiye ihtiyaç duyulmaktadır. Bu bilgiyi de "additional_parameters" ile sağlamaktayız. Bu örnekte, *order* adında bir ek parametre kullanıcıya sunulmalı ve gerekli *order* bilgisi alınmalıdır.

```json
"13": {
    "produces": [{"type":"dataframe", "compatibility":["batch"], "additional_parameters":["portion"]}],
    "takes": [{"type":"dataframe", "compatibility":["batch"]}]
  }
```

Yukarıdaki örnek *RandomSplit* nod ailesi için gerekli *edge_permission*'dır. BU nod ailesi, *batch* dataframe alır ve bir ya da daha fazla *dataframe* üretebilir. Bu *dataframe*'ler girdi *dataframe*'in *portion*'larıdır. Herhangi bir *target* nod ile bağlantı oluşturulurken, üretilen *portion*'lardan hangisinin kullanılmak istendiği belirtilmelidir. Bu nedenle, ek bilgi olarak *portion* değeri alınmalıdır.

Bir bağlantı oluşturulabilmesi için *source* ve *kaynak* nodlarının uyumlu olduğu en az bir bağlantı türü bulunmalıdır. Bu uyumluluk için *source* nodun "produces" ve *target* nodun "takes" alanlarında ortak bağlantı türü aranmalıdır. Bu ortak bağlantı türünün de "compatibility" kıstaslarının uyumlu olması gerekmektedir.

Kullanıcıya ekstra parametreler sunulacağı durumda, *convention* olarak *source* nodun ekstra parametreleri *target* nodun ekstra parametrelerinden önce sunulabilir. Burada önemli nokta bir bağlantının ekstra parametrelerinin hem *source* hem *target* noddarn gelebileceğidir. Örneğin, RandomSplit nodundan çıkan bir bağlantının Join noduna girmesi gibi (bu durumda hem portion hem de order bilgisine ihtiyaç olacaktır).

"pipeline" ve "cv" türündeki bağlantıların kullanılabilmesi için nodların *parent* nodlarının kontrol edilmesi gerekmektedir. Bu kontrol, şimdilik farklı iş-mantıklarına bırakılmıştır. Bu bilgi ileride *edge_permissions*'a alınabilir. Bununla birlikte, farklı streaming mod'ları için ayrıştırıcı bilginin tutulması ileriki versiyonlarda eklenecektir.

Ekstra parametrelerin değerleri sağlanırken kullanılması gereken veri türleri de *edge_permissions* altında yer almaktadır. Örneğin, UI bu bilgiye göre kullanıcıdan hangi türde veri alacağını anlayabilir. *edge_type*'lar string formatında olacaktır ve bu bilgiye dahil edilmemişlerdir. Farklı *edge_type*'ların aynı isimli ve farklı veri türünde ek parametre almasına izin verilmemektedir. Böyle bir ihtiyaç olması durumunda *parameter_info* formatını düzenleyiniz.

```json
"parameter_info":{
    "portion": {"type": "integer", "piecewise_constraint": "portion >= 0"},
    "order": {"type": "integer", "piecewise_constraint": "order >= 0"}
}
```

Mevcut versiyonda yer alan bağlantı türleri şunlardır:
* dataframe
* model
* pipeline
* cv
* upstream

upstream task'lar arasında kullanılır ve *target* noddaki task'ın *source* noddaki task'tan sonra yürütülmesi gerektiğini belirtir.

*dataframe* bağlantı türü iki ekstra parametre alabilir:
* portion
* order

*dataframe* bağlantı türü iki farklı *compatibility* taşımaktadır:
* batch
* stream