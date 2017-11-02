Schema {
    obj: {
        email: {
            type: [Function: String],
            require: true,
            trim: true,
            minlength: 1,
            unique: true,
            validate: [Object]
        },
        password: {
            type: [Function: String],
            required: true,
            minlength: 6
        },
        tokens: [
            [Object]
        ]
    },
    paths: {
        email: SchemaString {
            enumValues: [],
            regExp: null,
            path: 'email',
            instance: 'String',
            validators: [Object],
            setters: [Object],
            getters: [],
            options: [Object],
            _index: [Object],
            minlengthValidator: [Function]
        },
        password: SchemaString {
            enumValues: [],
            regExp: null,
            path: 'password',
            instance: 'String',
            validators: [Object],
            setters: [],
            getters: [],
            options: [Object],
            _index: null,
            isRequired: true,
            requiredValidator: [Function],
            originalRequiredValue: true,
            minlengthValidator: [Function]
        },
        tokens: DocumentArray {
            casterConstructor: [Object],
            caster: [Object],
            '$isMongooseArray': true,
            path: 'tokens',
            instance: 'Array',
            validators: [],
            setters: [],
            getters: [],
            options: [Object],
            _index: null,
            defaultValue: [Function],
            schema: [Object],
            '$isMongooseDocumentArray': true
        },
        _id: ObjectId {
            path: '_id',
            instance: 'ObjectID',
            validators: [],
            setters: [Object],
            getters: [],
            options: [Object],
            _index: null,
            defaultValue: [Function: defaultId]
        },
        __v: SchemaNumber {
            path: '__v',
            instance: 'Number',
            validators: [],
            setters: [],
            getters: [],
            options: [Object],
            _index: null
        }
    },
    aliases: {},
    subpaths: {},
    virtuals: {
        id: VirtualType {
            path: 'id',
            getters: [Object],
            setters: [],
            options: {}
        }
    },
    singleNestedPaths: {},
    nested: {},
    inherits: {},
    callQueue: [
        ['pre', [Object]],
        ['pre', [Object]],
        ['pre', [Object]],
        ['on', [Object]],
        ['pre', [Object]],
        ['on', [Object]]
    ],
    _indexes: [],
    methods: {},
    statics: {},
    tree: {
        email: {
            validate: [Object],
            unique: true,
            minlength: 1,
            trim: true,
            require: true,
            type: [Function: String]
        },
        password: {
            minlength: 6,
            required: true,
            type: [Function: String]
        },
        tokens: [
            [Object]
        ],
        _id: {
            type: [Object],
            auto: true
        },
        __v: [Function: Number],
        id: VirtualType {
            path: 'id',
            getters: [Object],
            setters: [],
            options: {}
        }
    },
    query: {},
    childSchemas: [{
        schema: [Object],
        model: [Object]
    }],
    plugins: [{
            fn: [Function],
            opts: [Object]
        },
        {
            fn: [Function],
            opts: [Object]
        },
        {
            fn: [Object],
            opts: [Object]
        },
        {
            fn: [Function],
            opts: [Object]
        }
    ],
    s: {
        hooks: Kareem {
            _pres: {},
            _posts: {}
        },
        kareemHooks: {
            count: true,
            find: true,
            findOne: true,
            findOneAndUpdate: true,
            findOneAndRemove: true,
            insertMany: true,
            replaceOne: true,
            update: true,
            updateMany: true,
            updateOne: true
        }
    },
    options: {
        retainKeyOrder: false,
        typeKey: 'type',
        id: true,
        noVirtualId: false,
        _id: true,
        noId: false,
        validateBeforeSave: true,
        read: null,
        shardKey: null,
        autoIndex: null,
        minimize: true,
        discriminatorKey: '__t',
        versionKey: '__v',
        capped: false,
        bufferCommands: true,
        strict: true,
        pluralization: true
    },
    '$globalPluginsApplied': true
}