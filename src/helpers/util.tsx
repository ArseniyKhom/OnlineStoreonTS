export function formatCurrency(num) {
    if(num) return 'R' + Number(num.toFixed(3)).toLocaleString() + ' '
}