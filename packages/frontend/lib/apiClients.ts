import axios from 'axios'
import aspida from '@aspida/axios'
import api from '$/api/$api'

const baseURL = (process.env.NEXT_PUBLIC_BASE_URL || '') + '/api'

export const apiClient = api(aspida(axios, { baseURL }))
