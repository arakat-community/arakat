package io.github.arakat.arakatcommunity.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class JSONModifier {

    public void modifyJson() {
        final JSONObject res = new JSONObject();
        JSONArray jarray = new JSONArray();

        for(int i=0; i<3; i++) {
            JSONObject ob = new JSONObject();
            ob.put("k1"+i, "v1"+i);
            ob.put("k2"+i, "v2"+i);
            jarray.put(ob);
        }

        res.put("res", jarray);
        System.out.println(res);

        res.append("ali", "veli");
        System.out.println(res);


        String json = "{ \"f1\":\"Hello\",\"f2\":{\"f3:\":\"World\"}}";
        JSONObject jss = new JSONObject(json);
        jss.append("ali", "veli");
        System.out.println(jss);
    }
}

// 1
//{
//    "res":[
//        {
//            "k20":"v20",
//            "k10":"v10"
//        },
//        {
//            "k11":"v11",
//            "k21":"v21"
//        },
//        {
//            "k22":"v22",
//            "k12":"v12"
//        }
//    ]
//}

// 2
//{
//    "res":[
//        {
//        "k20":"v20",
//        "k10":"v10"
//        },
//        {
//        "k11":"v11",
//        "k21":"v21"
//        },
//        {
//        "k22":"v22",
//        "k12":"v12"
//        }
//    ],
//    "ali":[
//    "veli"
//    ]
//}

// 3
//{
//    "f1":"Hello",
//    "f2":{
//        "f3:":"World"
//    },
//    "ali":[
//    "veli"
//    ]
//}

//{"res":[{"k20":"v20","k10":"v10"},{"k11":"v11","k21":"v21"},{"k22":"v22","k12":"v12"}]}
//        {"res":[{"k20":"v20","k10":"v10"},{"k11":"v11","k21":"v21"},{"k22":"v22","k12":"v12"}],"ali":["veli"]}
//        {"f1":"Hello","f2":{"f3:":"World"},"ali":["veli"]}
