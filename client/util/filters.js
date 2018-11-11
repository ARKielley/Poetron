const punctuationRegEx = /[,\.;—\-\?!]/g
const returnRegEx = /[\r\n]/g
const commonWords = ['the','be','of','and','a','to','in','he','have','it','that','for','they','I','with',
'as','not','on','she','at','by','this','we','you','do','but','from','or','which','one','would','all',
'will','there','say','who','make','when','can','more','if','no','man','out','other','so','what','time',
'up','go','about','than','into','could','state','only','new','year','some','take','come','these','know',
'see','use','get','like','then','first','any','work','now','may','such','give','over','think','most',
'even','find','day','also','after','way','many','must','look','before','great','back','through','long',
'where','much','should','well','people','down','own','just','because','good','each','those','feel',
'seem','how','high','too','place','little','world','very','still','nation','hand','old','life','tell',
'write','become','here','show','house','both','between','need','mean','call','develop','under','last',
'right','move','thing','general','school','never','same','another','begin','while','number','part',
'turn','real','leave','might','want','point','form','off','child','few','small','since','against','ask',
'late','home','interest','large','person','end','open','public','follow','during','present','without',
'again','hold','govern','around','possible','head','consider','word','program','problem','however',
'lead','system','set','order','eye','plan','run','keep','face','fact','group','play','stand','increase',
'early','course','change','help','line']



export const shuffle = (arr) => { 
  let i, j, temp
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      temp = arr[i] // faster than destructuring swap
      arr[i] = arr[j] 
      arr[j] = temp
  }
  return arr
}

export const filterPunctuation = (results, percentage) => results.filter(res => {
  if (Math.random() <= percentage) return !punctuationRegEx.test(res)
})
export const filterReturns = (results, percentage) => results.filter(res => {
  if (Math.random() <= percentage) return !returnRegEx.test(res)
})
export const filterCommonWords = (results, percentage) => results.filter(res => {
  const wordPortion = commonWords.slice(0, Math.floor(commonWords.length * percentage))
  console.log('filtering with a slice of ', wordPortion)
  return !wordPortion.includes(res)
})

export const curryFilter = (filter, percentage) => (results) => filter(results, percentage)