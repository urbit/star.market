export const formatTicket = (ticket: string) => {
  const formatted = ticket.replace(/[^~a-zA-Z-]/g,'').toLowerCase()

  if (ticket[0] !== '~') {
    return `~${formatted}`
  }
  
  return formatted
}
