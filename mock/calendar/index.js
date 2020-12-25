const CALENDAR = [
  {
    url: '/calendar/todo',
    method: 'get',
    response (req, res) {
      return {
        code: 200,
        msg: 'success',
        data: []
      };
    }
  }
]

module.exports = {
  CALENDAR
}
