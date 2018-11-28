import collections
import json

from flask import Flask
from flask import request
from flask_cors import CORS

from src.pipeline_generator.generators import PipelineGenerator

app = Flask(__name__)
CORS(app)

global my_Server

class CoreService(object):

   def __init__(self, args):
       pass

def run_my_server(args):
   global my_Server
   my_Server=CoreService(args)
   app.run(host=args[0], port=int(args[1]))


@app.route('/interpret_graph',methods=['POST'])
def interpret_graph():
   json_data = request.get_json(force=True)
   json_data = convert(json_data)
   print(json_data)
   print(type(json_data))
   graph = json_data['graph']
   print(graph)
   print("------------")
   dag_properties = json_data['dag_properties']
   print(dag_properties)
   print("------------")
   code_info, success, errors, additional_info = PipelineGenerator.generate_pipeline(graph, dag_properties)
   result={"codes": code_info, "result_code": success, "errors": errors, "additional_info": additional_info}
   json_string = json.dumps(result)
   return json_string

def convert(data):
    if isinstance(data, basestring):
        return str(data)
    elif isinstance(data, collections.Mapping):
        return dict(map(convert, data.iteritems()))
    elif isinstance(data, collections.Iterable):
        return type(data)(map(convert, data))
    else:
        return data