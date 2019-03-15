module.exports = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  '$id': 'dat://unwalled.garden/post.json',
  'type': 'object',
  'title': 'Post',
  'description': 'A broadcasted piece of content.',
  'required': ['type', 'content', 'createdAt'],
  'properties': {
    'type': {
      'type': 'string',
      'title': "The object's type",
      'const': 'unwalled.garden/post'
    },
    'content': {
      'type': 'object',
      'required': ['body'],
      'properties': {
        'body': {
          'type': 'string',
          'title': "The post's text body",
          'maxLength': 280
        }
      }
    },
    'createdAt': {
      'type': 'string',
      'format': 'date-time',
      'title': "The time of this post's creation"
    },
    'updatedAt': {
      'type': 'string',
      'format': 'date-time',
      'title': "The time of this post's last edit"
    }
  }
}