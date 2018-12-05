export const exampleData = {
        "nodes": [
                {
                        "data": {
                                id: 'node1',
                                nodeID: 'node70',
                                nodeType: 0,
                                parent: 'task1',
                                parentNodeType: 1,
                                visibleName: 'Inner Node 1',
                        }
                },
                {
                        "data": {
                                id: 'task1',
                                nodeType: 1,
                                parent: "none",
                                visibleName: 'task Node 1'
                        }
                },
        ],
        "edges": [
                {
                        "data": {
                                "id": "ab",
                                "source": "a",
                                "target": "b"
                        }
                },
                {
                "data": {
                "id": "cd",
                        "source": "c",
                        "target": "d"
                }
                },
                {
                "data": {
                "id": "ef",
                        "source": "e",
                        "target": "f"
                }
                },
                {
                "data": {
                "id": "ac",
                        "source": "a",
                        "target": "d"
                }
                },
                {
                "data": {
                 "id": "be",
                        "source": "b",
                        "target": "e"
                    }
                    }]    
        }
    