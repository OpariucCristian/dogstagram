/* eslint-disable no-plusplus */

export function seedDatabase(firebase) {
  const users = [
    {
      userId: '7vxtMx7cLcR0ipv2dNZiW3HR6yy1',
      username: 'vasya',
      fullName: 'Vasya Borodachenko',
      emailAddress: 'opariuccristian@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'max',
      fullName: 'Raffaello Max',
      emailAddress: 'raphaello@max.com',
      following: [],
      followers: ['me1SS4l2k8acOQpgjVbnioEqBcX2'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'gordon',
      fullName: 'Ramsey Gordon',
      emailAddress: 'gordon@ramsey.com',
      following: [],
      followers: ['me1SS4l2k8acOQpgjVbnioEqBcX2'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'mike',
      fullName: 'Mike Pup',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['me1SS4l2k8acOQpgjVbnioEqBcX2'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/Max/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'gordon',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'mike',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}
