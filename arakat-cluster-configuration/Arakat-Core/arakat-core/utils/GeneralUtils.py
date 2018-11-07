def call_function_by_name(module_name, function_name, args):
    module=__import__(module_name, fromlist=[''])
    func = getattr(module, function_name)
    return func(args)