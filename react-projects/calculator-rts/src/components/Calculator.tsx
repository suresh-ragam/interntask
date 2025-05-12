import React, { useState } from 'react';
import {
  Container, Box, Button, Grid, TextField, Snackbar, Alert, Typography
} from '@mui/material';

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '%', '+'],
  ['√', 'C', '=', 'Del']
];

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (value: string) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
      return;
    }
    if (value === 'Del') {
      setExpression((prev) => prev.slice(0, -1));
      setResult('');
      return;
    }
    if (value === '=') {
      calculateResult();
      return;
    }
    if (value === '√') {
      try {
        const num = parseFloat(result || expression);
        if (isNaN(num) || num < 0) {
          throw new Error("Invalid input for square root");
        }
        setExpression(`√(${num})`);
        setResult(Math.sqrt(num).toString());
      } catch (err) {
        showError("Cannot calculate square root.");
      }
      return;
    }
    
    if(result && !['+','-','*','/','%'].includes(value)){
        setExpression(value);
        setResult('');
    } else {
        setExpression((prev) => prev + value);
    }
  };

  const calculateResult = () => {
    try {
        let expr = expression;

        expr = expr.replace(/√\(([^)]+)\)/g, (_, group) => `Math.sqrt(${group})`);

        //basic safety: allows digits, oerators, parethesis
        if (!/^[0-9+\-*/%.()√ ]*$/.test(expression)) {
            throw new Error('Invalid characters in expression');
        
        }

        //evaluate final expression
        const res = Function(`return (${expr})`)();
        if(res === Infinity || isNaN(res)){
            throw new Error('Invalid calculation');
        }

        setResult(res.toString());
        setExpression(res.toString());
    } catch(err) {
        showError('Invalid expression or division by zero');
    }
  };

  const showError = (message: string) => {
    setError(message);
    setOpen(true);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          borderRadius: 4,
          padding: 3,
          boxShadow: 5,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#90caf9' }}>
          Calculator
        </Typography>

       <Box sx={{ width: '100%' }}>
            <TextField
                variant="outlined"
                fullWidth
                value={expression}
                onChange={(e) => {
                    const allowed = /^[0-9+\-*/%.()√]*$/;
                    if (allowed.test(e.target.value)) {
                        setExpression(e.target.value);
                        setResult('');
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        calculateResult();
                    } else if (e.key === 'Backspace') {
                        // Allow default backspace behavior
                    } else {
                        const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','%','(',')','√'];
                        if (!allowedKeys.includes(e.key) && e.key.length === 1) {
                            e.preventDefault();
                        }
                    }
                }}
                InputProps={{
                    sx: {
                        fontSize: '1.6rem',
                        color: 'white',
                        textAlign: 'right',
                        padding: '10px',
                    }
                }}
                sx={{
                    input: { color: 'white' },
                    backgroundColor: '#2e2e2e',
                    borderRadius: 1,
                    mb: 2,
                }}
            />


            <Grid container spacing={1} sx={{ width: '100%' }}>
            {buttons.flat().map((btn, idx) => (
            <Grid item xs={3} key={idx}>
            <Button
                variant="contained"
                onClick={() => handleClick(btn)}
                fullWidth
                sx={{
                    height: 64,
                    fontSize: '1.2rem',
                    borderRadius: 0,
                    backgroundColor: btn === '=' ? '#4caf50' : '#424242',
                    color: 'white',
                    textTransform: 'none',
                    fontFamily: 'monospace',
                    '&:hover': {
                        backgroundColor: btn === '=' ? '#43a047' : '#616161'
                    }
                }}
            >
                {btn}
            </Button>
            </Grid>
            ))}
            </Grid>
        </Box>


        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
          <Alert severity="error" onClose={() => setOpen(false)}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Calculator;