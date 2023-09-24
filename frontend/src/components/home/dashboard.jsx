import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import { Stat } from './Stat'

const stats = [
  {
    label: 'Pedidos hoy',
    value: '120',
  },
  {
    label: 'Pedidos este mes',
    value: '45000',
  },
  {
    label: 'Medía cancelaciones',
    value: '12.87%',
  },
]

export default function Dashboard() {
  return (
    <Box
      as="section"
      py={{
        base: '4',
        md: '8',
      }}
    >
      <Container>
        <SimpleGrid
          columns={{
            base: 1,
            md: 3,
          }}
          gap={{
            base: '5',
            md: '6',
          }}
        >
          {stats.map(({ label, value }) => (
            <Stat key={label} label={label} value={value} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>)
}