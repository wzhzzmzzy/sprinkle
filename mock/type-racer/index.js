const TYPE_RACER = [
  {
    url: '/typeracer/text',
    method: 'get',
    response (req, res) {
      return {
        code: 200,
        msg: 'success',
        data: 'Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence; and had lived nearly twenty-one years in the world with very little to distress or vex her.',
      };
    },
  },
]

module.exports = {
  TYPE_RACER
}
