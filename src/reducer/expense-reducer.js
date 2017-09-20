let validateCategory = (category) => {
  if(!category.id || !category.title || !category.timestamp)
    throw new Error('Validation Failed: category must have id, title, and timestamp')
}
let validateExpense = (expense) => {
  if(!expense.id || !expense.cost  || !expense.categoryID)
    throw new Error('Validation Failed: expense must have id, cost, and timestamp')
}
let originalState = {}

export default (state=originalState, action) => {
  let {type, payload} = action
  let categoryID, categoryExpenses
  switch(type){
  case 'CATEGORY_CREATE':
    return {...state, [payload.id]: []}
  case 'CATEGORY_DELETE':
    return {...state, [payload.id]: undefined}
  case 'EXPENSE_CREATE':
    categoryID = payload.categoryID
    categoryExpenses = state[categoryID]
    return {...state, [categoryID]: [...categoryExpenses, payload]}
  case 'EXPENSE_UPDATE':
    categoryID = payload.categoryID
    categoryExpenses = state[categoryID]
    return {...state,
      [categoryID]: categoryExpenses.map(expense =>
        expense.id == payload.id ? payload : expense),
    }
  case 'EXPENSE_DELETE':
    categoryID = payload.categoryID
    categoryExpenses = state[categoryID]
    return {...state,
      [categoryID]: categoryExpenses.filter(expense =>
        expense.id !== payload.id),
    }
  default:
    return state
  }
}
