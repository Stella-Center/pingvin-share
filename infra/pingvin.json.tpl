[
  {
    "name": "pingvin",
    "image": "${ecr_image_uri}",
    "cpu": 0,
    "memory": 1024,
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${awslogs_group}",
        "awslogs-region": "${region}",
        "awslogs-stream-prefix": "ecs",
        "awslogs-create-group": "true"
      }
    },
    "portMappings": [
      {
        "containerPort": 3000,
        "hostPort": 0
      }
    ],
    "mountPoints": [
        {
            "sourceVolume": "service-storage",
            "containerPath": "/tmp/data"
        }
    ],
    "environment": [
        {
            "name": "NEXT_PUBLIC_MIXPANEL_KEY",
            "value": "${mixpanel_token}"
        },
        {
            "name": "DATA_DIRECTORY",
            "value": "/tmp/data"
        },
        {
            "name": "DATABASE_URL",
            "value": "file://tmp/data/pingvin-share.db?connection_limit=3"
        }
    ]
  }
]
