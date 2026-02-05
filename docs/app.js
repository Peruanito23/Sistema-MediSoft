const { useState, useEffect } = React;

// ============ UI COMPONENTS ============
const Button = ({ children, onClick, className = '', variant = 'default', leftIcon, leftIconSrc, ...props }) => {
    const base = 'btn';
    const variants = {
        default: 'btn-ghost',
        primary: 'btn-primary',
        outline: 'btn-outline',
        destructive: 'btn-ghost'
    };

    return (
        <button
            className={`${base} ${variants[variant] || variants.default} ${className}`}
            onClick={onClick}
            {...props}
        >
            {leftIconSrc && <img src={leftIconSrc} alt="icon" className="w-5 h-5 rounded-full" />}
            {leftIcon && <i className={`${leftIcon} mr-1`} />}
            {children}
        </button>
    );
};

const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
};

const Label = ({ children, htmlFor, className = '' }) => {
    return (
        <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-900 mb-1 ${className}`}>
            {children}
        </label>
    );
};

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

const CardHeader = ({ children, className = '' }) => {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

const CardTitle = ({ children, className = '' }) => {
    return (
        <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
            {children}
        </h3>
    );
};

const CardContent = ({ children, className = '' }) => {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
};

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-900',
        success: 'bg-green-100 text-green-900',
        warning: 'bg-yellow-100 text-yellow-900',
        destructive: 'bg-red-100 text-red-900',
        outline: 'border border-gray-300 text-gray-900'
    };
    
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

const Dialog = ({ children, open, onOpenChange }) => {
    if (!open) return null;
    
    return (
        <>
            <div className="dialog-overlay" onClick={() => onOpenChange(false)} />
            {children}
        </>
    );
};

const DialogTrigger = ({ children, onClick }) => {
    return React.cloneElement(children, { onClick });
};

const DialogContent = ({ children, className = '' }) => {
    return (
        <div className={`dialog-content ${className}`}>
            {children}
        </div>
    );
};

const DialogHeader = ({ children, className = '' }) => {
    return (
        <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

const DialogTitle = ({ children, className = '' }) => {
    return (
        <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
            {children}
        </h2>
    );
};

const DialogDescription = ({ children, className = '' }) => {
    return (
        <p className={`text-sm text-gray-900 mt-1 ${className}`}>
            {children}
        </p>
    );
};

const SettingsDialog = ({ open, onOpenChange, theme, onSetTheme, bgChoice, onSetBgChoice }) => {
    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Preferencias</DialogTitle>
                </DialogHeader>
                <div className="px-6 py-4 space-y-4">
                    <div>
                        <h4 className="font-medium text-gray-900">Tema</h4>
                        <div className="flex items-center gap-3 mt-3">
                            <Button variant={theme === 'light' ? 'primary' : 'outline'} onClick={() => onSetTheme('light')}>Claro</Button>
                            <Button variant={theme === 'dark' ? 'primary' : 'outline'} onClick={() => onSetTheme('dark')}>Oscuro</Button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900">Fondo de inicio</h4>
                        <div className="flex items-center gap-3 mt-3">
                            <button onClick={() => onSetBgChoice('fondo1')} className={`p-1 rounded ${bgChoice === 'fondo1' ? 'ring-2 ring-blue-400' : 'border'}`}>
                                <img src="../Img/fondo1.jpg" alt="f1" className="w-28 h-16 object-cover rounded" />
                            </button>
                            <button onClick={() => onSetBgChoice('fondo2')} className={`p-1 rounded ${bgChoice === 'fondo2' ? 'ring-2 ring-blue-400' : 'border'}`}>
                                <img src="../Img/fondo2.jpg" alt="f2" className="w-28 h-16 object-cover rounded" />
                            </button>
                            <button onClick={() => onSetBgChoice('fondo3')} className={`p-1 rounded ${bgChoice === 'fondo3' ? 'ring-2 ring-blue-400' : 'border'}`}>
                                <img src="../Img/fondo3.jpg" alt="f3" className="w-28 h-16 object-cover rounded" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const Tabs = ({ children, defaultValue }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, { activeTab, setActiveTab });
    });
    
    return (
        <div className="space-y-4">
            {childrenWithProps}
        </div>
    );
};

const TabsList = ({ children, activeTab, setActiveTab, className = '' }) => {
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, { activeTab, setActiveTab });
    });
    
    return (
        <div className={`flex border-b border-gray-200 ${className}`}>
            {childrenWithProps}
        </div>
    );
};

const TabsTrigger = ({ children, value, activeTab, setActiveTab, className = '' }) => {
    const isActive = activeTab === value;
    
    return (
        <button
            className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                isActive 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            } ${className}`}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    );
};

const TabsContent = ({ children, value, activeTab, className = '' }) => {
    if (value !== activeTab) return null;
    
    return (
        <div className={className}>
            {children}
        </div>
    );
};

const Textarea = ({ className = '', ...props }) => {
    return (
        <textarea
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            rows="3"
            {...props}
        />
    );
};

const Select = ({ children, className = '', ...props }) => {
    return (
        <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props}>
            {children}
        </select>
    );
};

const Table = ({ children, className = '' }) => {
    return (
        <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
            {children}
        </table>
    );
};

const TableHeader = ({ children }) => {
    return (
        <thead className="bg-gray-50">
            {children}
        </thead>
    );
};

const TableBody = ({ children }) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {children}
        </tbody>
    );
};

const TableRow = ({ children, className = '' }) => {
    return (
        <tr className={className}>
            {children}
        </tr>
    );
};

const TableHead = ({ children, className = '' }) => {
    return (
        <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
            {children}
        </th>
    );
};

const TableCell = ({ children, className = '' }) => {
    return (
        <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
            {children}
        </td>
    );
};

// ============ PAGES ============

// 1. Login Component
const Login = ({ onLogin, bgChoice }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className={`min-h-screen login-hero bg-${bgChoice || 'fondo1'} flex items-center justify-center p-4`}>
            <Card className="w-full max-w-md login-card">
                <CardHeader className="space-y-1">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                            <img src="../Img/Logo.png" alt="Logo" className="logo-img-lg" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-semibold text-gray-900">Sistema Médico</h1>
                            <p className="text-gray-600 mt-2">Ingresa tus credenciales para acceder</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <i className="fas fa-envelope absolute left-3 top-3 h-4 w-4 text-gray-400"></i>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="doctor@hospital.com"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <i className="fas fa-lock absolute left-3 top-3 h-4 w-4 text-gray-400"></i>
                                <Input
                                    id="password"
                                    type="password"
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" variant="primary">
                            Iniciar Sesión
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

// 2. Dashboard Layout
const Dashboard = ({ children, currentPage, onLogout, onNavigate, theme, onSetTheme, bgChoice, onSetBgChoice }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const menuItems = [
        { id: 'patients', icon: 'fa-users', label: 'Gestión de Pacientes' },
        { id: 'appointments', icon: 'fa-calendar', label: 'Agenda y Citas' },
        { id: 'billing', icon: 'fa-dollar-sign', label: 'Facturación y Pagos' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src="../Img/logoConFondo.png" alt="logo" className="logo-img" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Sistema Médico</h1>
                            <p className="text-gray-600">Panel de Administración</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-2">
                            <i className="fas fa-cog"></i>
                            Ajustes
                        </Button>
                        <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
                            <i className="fas fa-sign-out-alt"></i>
                            Cerrar Sesión
                        </Button>
                    </div>
                    <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} theme={theme} onSetTheme={onSetTheme} bgChoice={bgChoice} onSetBgChoice={onSetBgChoice} />
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-72 bg-white border-r h-screen sticky top-20">
                    <nav className="p-4 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = currentPage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                                        isActive
                                        ? 'active-link'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <i className={`fas ${item.icon} w-5 h-5`}></i>
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

// 3. Gestión de Pacientes
const PatientManagement = () => {
    const [patients, setPatients] = useState([
        {
            id: '1',
            name: 'María González',
            age: 45,
            gender: 'Femenino',
            email: 'maria.g@email.com',
            phone: '+34 612 345 678',
            address: 'Calle Mayor 123, Madrid',
            allergies: ['Penicilina', 'Polen'],
            chronicConditions: ['Hipertensión'],
            medications: [{ name: 'Enalapril', dosage: '10mg', status: 'Activo' }],
            bloodType: 'A+',
            lastVisit: '2024-01-10'
        },
        {
            id: '2',
            name: 'Juan Pérez',
            age: 32,
            gender: 'Masculino',
            email: 'juan.p@email.com',
            phone: '+34 623 456 789',
            address: 'Av. Libertad 45, Barcelona',
            allergies: [],
            chronicConditions: ['Asma'],
            medications: [{ name: 'Salbutamol', dosage: '100mcg', status: 'Activo' }],
            bloodType: 'O+',
            lastVisit: '2024-01-05'
        },
        {
            id: '3',
            name: 'Ana Martínez',
            age: 28,
            gender: 'Femenino',
            email: 'ana.m@email.com',
            phone: '+34 634 567 890',
            address: 'Plaza España 7, Valencia',
            allergies: ['Ibuprofeno'],
            chronicConditions: ['Migraña'],
            medications: [{ name: 'Sumatriptán', dosage: '50mg', status: 'Activo' }],
            bloodType: 'B-',
            lastVisit: '2024-01-08'
        }
    ]);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [newPatient, setNewPatient] = useState({
        name: '',
        age: '',
        gender: 'Masculino',
        email: '',
        phone: '',
        address: '',
        allergies: '',
        chronicConditions: '',
        bloodType: 'A+'
    });

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getBloodTypeColor = (type) => {
        const colors = {
            'A+': 'bg-red-100 text-red-800',
            'O+': 'bg-blue-100 text-blue-800',
            'B-': 'bg-purple-100 text-purple-800',
            'AB+': 'bg-green-100 text-green-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const handleAddPatient = () => {
        const patient = {
            id: (patients.length + 1).toString(),
            name: newPatient.name,
            age: parseInt(newPatient.age) || 0,
            gender: newPatient.gender,
            email: newPatient.email,
            phone: newPatient.phone,
            address: newPatient.address,
            allergies: newPatient.allergies.split(',').map(a => a.trim()).filter(a => a),
            chronicConditions: newPatient.chronicConditions.split(',').map(c => c.trim()).filter(c => c),
            medications: [],
            bloodType: newPatient.bloodType,
            lastVisit: new Date().toISOString().split('T')[0]
        };
        
        setPatients([...patients, patient]);
        setIsNewPatientOpen(false);
        setNewPatient({
            name: '',
            age: '',
            gender: 'Masculino',
            email: '',
            phone: '',
            address: '',
            allergies: '',
            chronicConditions: '',
            bloodType: 'A+'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">Gestión de Pacientes</h1>
                    <p className="text-gray-600 mt-1">Administra la información de los pacientes</p>
                </div>
                    <DialogTrigger onClick={() => setIsNewPatientOpen(true)}>
                    <Button variant="primary">
                        <i className="fas fa-plus mr-2"></i>
                        Nuevo Paciente
                    </Button>
                </DialogTrigger>
            </div>
            
            {/* Search */}
            <div className="relative">
                <i className="fas fa-search absolute left-3 top-3 h-4 w-4 text-gray-400"></i>
                <Input
                    placeholder="Buscar pacientes por nombre o email..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {/* Patients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map(patient => (
                    <Card key={patient.id} className="cursor-pointer card-hover" onClick={() => {
                        setSelectedPatient(patient);
                        setIsDetailOpen(true);
                    }}>
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">
                                        {patient.name}
                                    </CardTitle>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge className={getBloodTypeColor(patient.bloodType)}>
                                            {patient.bloodType}
                                        </Badge>
                                        <Badge variant="outline">{patient.age} años</Badge>
                                    </div>
                                </div>
                                <img src="../Img/Logo.png" alt="avatar" className="avatar" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <i className="fas fa-envelope"></i>
                                <span>{patient.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <i className="fas fa-phone"></i>
                                <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <i className="fas fa-map-marker-alt"></i>
                                <span className="truncate">{patient.address}</span>
                            </div>
                            {patient.allergies.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-exclamation-triangle text-red-500"></i>
                                    <span className="text-sm text-red-600">
                                        {patient.allergies.length} alergia(s)
                                    </span>
                                </div>
                            )}
                            {patient.chronicConditions.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-file-medical text-amber-500"></i>
                                    <span className="text-sm text-amber-600">
                                        {patient.chronicConditions.length} condición(es)
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            {/* New Patient Dialog */}
            <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Nuevo Paciente</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4 px-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input
                                id="name"
                                value={newPatient.name}
                                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="age">Edad</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={newPatient.age}
                                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Género</Label>
                                <Select
                                    id="gender"
                                    value={newPatient.gender}
                                    onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                                >
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={newPatient.email}
                                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                value={newPatient.phone}
                                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input
                                id="address"
                                value={newPatient.address}
                                onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="allergies">Alergias (separadas por comas)</Label>
                            <Textarea
                                id="allergies"
                                placeholder="Penicilina, Polen, etc."
                                value={newPatient.allergies}
                                onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                            <Select
                                id="bloodType"
                                value={newPatient.bloodType}
                                onChange={(e) => setNewPatient({...newPatient, bloodType: e.target.value})}
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                        <Button variant="outline" onClick={() => setIsNewPatientOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleAddPatient} variant="primary">
                            Guardar Paciente
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            
            {/* Patient Detail Dialog */}
            {selectedPatient && (
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Detalles del Paciente</DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="info">
                            <TabsList className="px-6">
                                <TabsTrigger value="info">Información</TabsTrigger>
                                <TabsTrigger value="history">Historial Médico</TabsTrigger>
                                <TabsTrigger value="medications">Medicamentos</TabsTrigger>
                                <TabsTrigger value="documents">Documentos</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="info" className="px-6 py-4 space-y-4">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3">Datos Personales</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><span className="font-medium">Nombre:</span> {selectedPatient.name}</p>
                                            <p><span className="font-medium">Edad:</span> {selectedPatient.age} años</p>
                                            <p><span className="font-medium">Género:</span> {selectedPatient.gender}</p>
                                            <p><span className="font-medium">Tipo Sanguíneo:</span> {selectedPatient.bloodType}</p>
                                            <p><span className="font-medium">Última Visita:</span> {selectedPatient.lastVisit}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3">Contacto</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><span className="font-medium">Email:</span> {selectedPatient.email}</p>
                                            <p><span className="font-medium">Teléfono:</span> {selectedPatient.phone}</p>
                                            <p><span className="font-medium">Dirección:</span> {selectedPatient.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="history" className="px-6 py-4">
                                <div className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-exclamation-triangle text-red-500"></i>
                                                <CardTitle>Alergias</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            {selectedPatient.allergies.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedPatient.allergies.map((allergy, index) => (
                                                        <Badge variant="destructive" key={index}>
                                                            {allergy}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">Sin alergias registradas</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-file-medical text-amber-500"></i>
                                                <CardTitle>Condiciones Crónicas</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            {selectedPatient.chronicConditions.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedPatient.chronicConditions.map((condition, index) => (
                                                        <Badge variant="outline" className="bg-amber-50" key={index}>
                                                            {condition}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">Sin condiciones registradas</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="medications" className="px-6 py-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Medicamentos</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {selectedPatient.medications.length > 0 ? (
                                            <div className="space-y-3">
                                                {selectedPatient.medications.map((med, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div>
                                                            <p className="font-medium">{med.name}</p>
                                                            <p className="text-sm text-gray-600">{med.dosage}</p>
                                                        </div>
                                                        <Badge className="bg-green-100 text-green-800">{med.status}</Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No hay medicamentos registrados</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="documents" className="px-6 py-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Documentos del Paciente</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                            <i className="fas fa-upload text-gray-400 text-4xl mb-4"></i>
                                            <p className="text-gray-600 mb-4">Arrastra y suelta archivos aquí o</p>
                                            <Button variant="outline">
                                                <i className="fas fa-upload mr-2"></i>
                                                Seleccionar Archivos
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

// 4. Agenda y Citas
const AppointmentSchedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [appointments, setAppointments] = useState([
        { id: '1', patientName: 'María González', date: new Date(), time: '09:00', type: 'Consulta General', status: 'confirmada', doctor: 'Dr. López' },
        { id: '2', patientName: 'Juan Pérez', date: new Date(), time: '10:30', type: 'Revisión', status: 'pendiente', doctor: 'Dr. López' },
        { id: '3', patientName: 'Ana Martínez', date: new Date(), time: '12:00', type: 'Primera Consulta', status: 'confirmada', doctor: 'Dr. López' },
        { id: '4', patientName: 'Carlos Ruiz', date: new Date(Date.now() + 86400000), time: '15:00', type: 'Urgencia', status: 'completada', doctor: 'Dra. García' },
        { id: '5', patientName: 'Laura Sánchez', date: new Date(Date.now() + 2 * 86400000), time: '11:00', type: 'Revisión', status: 'pendiente', doctor: 'Dr. Martínez' }
    ]);
    
    const [newAppointment, setNewAppointment] = useState({
        patientName: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        type: 'Consulta General',
        doctor: 'Dr. López'
    });

    const stats = {
        total: appointments.length,
        confirmed: appointments.filter(a => a.status === 'confirmada').length,
        pending: appointments.filter(a => a.status === 'pendiente').length,
        completed: appointments.filter(a => a.status === 'completada').length
    };

    const getStatusBadge = (status) => {
        const variants = {
            confirmada: 'bg-green-100 text-green-800',
            pendiente: 'bg-yellow-100 text-yellow-800',
            cancelada: 'bg-red-100 text-red-800',
            completada: 'bg-blue-100 text-blue-800'
        };
        return variants[status] || 'bg-gray-100 text-gray-800';
    };

    const handleAddAppointment = () => {
        if (!newAppointment.patientName || !newAppointment.time) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        const appointment = {
            id: (appointments.length + 1).toString(),
            patientName: newAppointment.patientName,
            date: new Date(newAppointment.date),
            time: newAppointment.time,
            type: newAppointment.type,
            status: 'pendiente',
            doctor: newAppointment.doctor
        };
        
        setAppointments([...appointments, appointment]);
        setIsNewAppointmentOpen(false);
        setNewAppointment({
            patientName: '',
            date: new Date().toISOString().split('T')[0],
            time: '',
            type: 'Consulta General',
            doctor: 'Dr. López'
        });
    };

    const filteredAppointments = appointments.filter(app => {
        const appDate = new Date(app.date);
        const selected = new Date(selectedDate);
        return appDate.toDateString() === selected.toDateString();
    });

    const Calendar = () => {
        const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
        const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
        
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        return (
            <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="p-2 hover:bg-gray-100 rounded"
                        onClick={() => {
                            const newDate = new Date(selectedDate);
                            newDate.setMonth(newDate.getMonth() - 1);
                            setSelectedDate(newDate);
                        }}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <h3 className="font-semibold">
                        {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </h3>
                    <button
                        className="p-2 hover:bg-gray-100 rounded"
                        onClick={() => {
                            const newDate = new Date(selectedDate);
                            newDate.setMonth(newDate.getMonth() + 1);
                            setSelectedDate(newDate);
                        }}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {dayNames.map(day => (
                        <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                        if (!day) {
                            return <div key={index} />;
                        }
                        
                        const isSelected = day === selectedDate.getDate();
                        const hasAppointment = appointments.some(app => {
                            const appDate = new Date(app.date);
                            return appDate.getDate() === day && 
                                   appDate.getMonth() === selectedDate.getMonth() &&
                                   appDate.getFullYear() === selectedDate.getFullYear();
                        });
                        
                        return (
                            <button
                                key={index}
                                className={`p-2 rounded text-center ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'} ${hasAppointment ? 'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-blue-500' : ''}`}
                                onClick={() => {
                                    const newDate = new Date(selectedDate);
                                    newDate.setDate(day);
                                    setSelectedDate(newDate);
                                }}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">Agenda y Citas</h1>
                    <p className="text-gray-600 mt-1">Gestiona las citas médicas</p>
                </div>
                    <DialogTrigger onClick={() => setIsNewAppointmentOpen(true)}>
                    <Button variant="primary">
                        <i className="fas fa-plus mr-2"></i>
                        Nueva Cita
                    </Button>
                </DialogTrigger>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Citas</p>
                                <p className="text-2xl font-semibold mt-1">{stats.total}</p>
                            </div>
                            <i className="fas fa-calendar text-blue-500 text-2xl"></i>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Confirmadas</p>
                                <p className="text-2xl font-semibold mt-1 text-green-600">{stats.confirmed}</p>
                            </div>
                            <i className="fas fa-check-circle text-green-500 text-2xl"></i>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                                <p className="text-2xl font-semibold mt-1 text-yellow-600">{stats.pending}</p>
                            </div>
                            <i className="fas fa-clock text-yellow-500 text-2xl"></i>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completadas</p>
                                <p className="text-2xl font-semibold mt-1 text-blue-600">{stats.completed}</p>
                            </div>
                            <i className="fas fa-check-circle text-blue-500 text-2xl"></i>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            {/* Calendar and Appointments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Calendario</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar />
                            <p className="text-sm text-gray-600 mt-4">
                                Seleccionado: {selectedDate.toLocaleDateString('es-ES', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Citas del Día</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map(app => (
                                    <Card key={app.id} className="card-hover">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-semibold">{app.patientName}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <i className="fas fa-clock text-gray-400"></i>
                                                        <span className="text-sm text-gray-600">{app.time}</span>
                                                    </div>
                                                </div>
                                                <Badge className={getStatusBadge(app.status)}>
                                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </Badge>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <i className="fas fa-stethoscope"></i>
                                                    {app.type}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img src="../Img/Logo.png" alt="avatar" className="avatar" />
                                                    {app.doctor}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">No hay citas programadas para esta fecha</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            {/* New Appointment Dialog */}
            <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Nueva Cita Médica</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4 px-6">
                        <div className="space-y-2">
                            <Label htmlFor="patient">Paciente</Label>
                            <Select
                                id="patient"
                                value={newAppointment.patientName}
                                onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                            >
                                <option value="">Seleccionar paciente</option>
                                <option value="María González">María González</option>
                                <option value="Juan Pérez">Juan Pérez</option>
                                <option value="Ana Martínez">Ana Martínez</option>
                                <option value="Carlos Ruiz">Carlos Ruiz</option>
                                <option value="Laura Sánchez">Laura Sánchez</option>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Fecha</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={newAppointment.date}
                                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Hora</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={newAppointment.time}
                                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo de Consulta</Label>
                            <Select
                                id="type"
                                value={newAppointment.type}
                                onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                            >
                                <option value="Consulta General">Consulta General</option>
                                <option value="Revisión">Revisión</option>
                                <option value="Primera Consulta">Primera Consulta</option>
                                <option value="Urgencia">Urgencia</option>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="doctor">Médico</Label>
                            <Select
                                id="doctor"
                                value={newAppointment.doctor}
                                onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                            >
                                <option value="Dr. López">Dr. López</option>
                                <option value="Dra. García">Dra. García</option>
                                <option value="Dr. Martínez">Dr. Martínez</option>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                        <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleAddAppointment} variant="primary">
                            Agendar Cita
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// 5. Facturación y Pagos
const BillingPayments = () => {
    const [activeTab, setActiveTab] = useState('invoices');
    const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
    const [invoices, setInvoices] = useState([
        {
            id: 'INV-001',
            patientName: 'María González',
            date: new Date('2024-01-09'),
            amount: 120.00,
            status: 'pagado',
            items: [
                { description: 'Consulta General', price: 80.00 },
                { description: 'Análisis de Sangre', price: 40.00 }
            ],
            insurance: 'Seguro Salud Plus'
        },
        {
            id: 'INV-002',
            patientName: 'Juan Pérez',
            date: new Date('2024-01-08'),
            amount: 150.00,
            status: 'pendiente',
            items: [
                { description: 'Consulta Especializada', price: 120.00 },
                { description: 'Radiografía', price: 30.00 }
            ]
        },
        {
            id: 'INV-003',
            patientName: 'Ana Martínez',
            date: new Date('2023-12-25'),
            amount: 200.00,
            status: 'vencido',
            items: [
                { description: 'Consulta General', price: 80.00 },
                { description: 'Ecografía', price: 120.00 }
            ],
            insurance: 'Medicare Premium'
        },
        {
            id: 'INV-004',
            patientName: 'Carlos Ruiz',
            date: new Date('2024-01-10'),
            amount: 95.50,
            status: 'pagado',
            items: [
                { description: 'Consulta General', price: 80.00 },
                { description: 'Medicamentos', price: 15.50 }
            ]
        }
    ]);
    
    const [payments, setPayments] = useState([
        { id: 'PAY-001', invoiceId: 'INV-001', patientName: 'María González', amount: 120.00, method: 'Tarjeta de Crédito', date: new Date('2024-01-09') },
        { id: 'PAY-002', invoiceId: 'INV-004', patientName: 'Carlos Ruiz', amount: 95.50, method: 'Efectivo', date: new Date('2024-01-10') }
    ]);
    
    const [newInvoice, setNewInvoice] = useState({
        patientName: '',
        insurance: 'Sin seguro',
        items: [{ description: '', price: '' }]
    });

    const stats = {
        totalIncome: payments.reduce((sum, payment) => sum + payment.amount, 0),
        pending: invoices.filter(i => i.status === 'pendiente').reduce((sum, inv) => sum + inv.amount, 0),
        overdue: invoices.filter(i => i.status === 'vencido').reduce((sum, inv) => sum + inv.amount, 0),
        totalInvoices: invoices.length
    };

    const getStatusBadge = (status) => {
        const variants = {
            pagado: 'bg-green-100 text-green-800',
            pendiente: 'bg-yellow-100 text-yellow-800',
            vencido: 'bg-red-100 text-red-800'
        };
        return variants[status] || 'bg-gray-100 text-gray-800';
    };

    const handleAddInvoice = () => {
        if (!newInvoice.patientName) {
            alert('Por favor selecciona un paciente');
            return;
        }

        const total = newInvoice.items.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            return sum + price;
        }, 0);
        
        const invoice = {
            id: `INV-00${invoices.length + 1}`,
            patientName: newInvoice.patientName,
            date: new Date(),
            amount: total,
            status: 'pendiente',
            items: newInvoice.items.map(item => ({
                description: item.description,
                price: parseFloat(item.price) || 0
            })),
            insurance: newInvoice.insurance === 'Sin seguro' ? undefined : newInvoice.insurance
        };
        
        setInvoices([...invoices, invoice]);
        setIsNewInvoiceOpen(false);
        setNewInvoice({
            patientName: '',
            insurance: 'Sin seguro',
            items: [{ description: '', price: '' }]
        });
    };

    const addInvoiceItem = () => {
        setNewInvoice({
            ...newInvoice,
            items: [...newInvoice.items, { description: '', price: '' }]
        });
    };

    const updateInvoiceItem = (index, field, value) => {
        const updatedItems = [...newInvoice.items];
        updatedItems[index][field] = value;
        setNewInvoice({ ...newInvoice, items: updatedItems });
    };

    const removeInvoiceItem = (index) => {
        const updatedItems = newInvoice.items.filter((_, i) => i !== index);
        setNewInvoice({ ...newInvoice, items: updatedItems });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">Facturación y Pagos</h1>
                    <p className="text-gray-600 mt-1">Gestiona facturas y pagos</p>
                </div>
                    <DialogTrigger onClick={() => setIsNewInvoiceOpen(true)}>
                        <Button variant="primary">
                        <i className="fas fa-plus mr-2"></i>
                        Nueva Factura
                    </Button>
                </DialogTrigger>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Ingresos</p>
                                <p className="text-2xl font-semibold mt-1 text-green-600">
                                    €{stats.totalIncome.toFixed(2)}
                                </p>
                            </div>
                            <i className="fas fa-euro-sign text-green-500 text-2xl"></i>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Por Cobrar</p>
                                <p className="text-2xl font-semibold mt-1 text-yellow-600">
                                    €{stats.pending.toFixed(2)}
                                </p>
                            </div>
                            <i className="fas fa-clock text-yellow-500 text-2xl"></i>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Vencidos</p>
                                <p className="text-2xl font-semibold mt-1 text-red-600">
                                    €{stats.overdue.toFixed(2)}
                                </p>
                            </div>
                            <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Facturas</p>
                                <p className="text-2xl font-semibold mt-1">{stats.totalInvoices}</p>
                            </div>
                            <i className="fas fa-file-invoice text-blue-500 text-2xl"></i>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            {/* Tabs */}
            <Card>
                <CardHeader>
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                                activeTab === 'invoices' 
                                ? 'border-blue-600 text-blue-600' 
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                            onClick={() => setActiveTab('invoices')}
                        >
                            Facturas
                        </button>
                        <button
                            className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                                activeTab === 'payments' 
                                ? 'border-blue-600 text-blue-600' 
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                            onClick={() => setActiveTab('payments')}
                        >
                            Pagos Recibidos
                        </button>
                        <button
                            className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px ${
                                activeTab === 'reports' 
                                ? 'border-blue-600 text-blue-600' 
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                            onClick={() => setActiveTab('reports')}
                        >
                            Reportes
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    {activeTab === 'invoices' && (
                        <div className="space-y-4">
                            <div className="relative">
                                <i className="fas fa-search absolute left-3 top-3 h-4 w-4 text-gray-400"></i>
                                <Input
                                    placeholder="Buscar facturas por paciente o número..."
                                    className="pl-10"
                                />
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Número</TableHead>
                                            <TableHead>Paciente</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Seguro</TableHead>
                                            <TableHead>Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoices.map(invoice => (
                                            <TableRow key={invoice.id}>
                                                <TableCell>{invoice.id}</TableCell>
                                                <TableCell>{invoice.patientName}</TableCell>
                                                <TableCell>
                                                    {invoice.date.toLocaleDateString('es-ES')}
                                                </TableCell>
                                                <TableCell>
                                                    €{invoice.amount.toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusBadge(invoice.status)}>
                                                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {invoice.insurance || 'No'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" className="text-sm">
                                                        <i className="fas fa-download mr-1"></i>
                                                        PDF
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'payments' && (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID Pago</TableHead>
                                        <TableHead>Factura</TableHead>
                                        <TableHead>Paciente</TableHead>
                                        <TableHead>Monto</TableHead>
                                        <TableHead>Método</TableHead>
                                        <TableHead>Fecha</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.map(payment => (
                                        <TableRow key={payment.id}>
                                            <TableCell>{payment.id}</TableCell>
                                            <TableCell>{payment.invoiceId}</TableCell>
                                            <TableCell>{payment.patientName}</TableCell>
                                            <TableCell>
                                                €{payment.amount.toFixed(2)}
                                            </TableCell>
                                            <TableCell>{payment.method}</TableCell>
                                            <TableCell>
                                                {payment.date.toLocaleDateString('es-ES')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                    
                    {activeTab === 'reports' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Ingresos Mensuales</h3>
                                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                                    <div className="w-full px-6">
                                        <div className="flex items-end justify-between h-40">
                                            {[
                                                { mes: 'Jul', ingresos: 4200 },
                                                { mes: 'Ago', ingresos: 5100 },
                                                { mes: 'Sep', ingresos: 4800 },
                                                { mes: 'Oct', ingresos: 6200 },
                                                { mes: 'Nov', ingresos: 5500 },
                                                { mes: 'Dic', ingresos: 6800 }
                                            ].map((item) => (
                                                <div className="flex flex-col items-center flex-1 mx-1" key={item.mes}>
                                                    <div className="text-xs mb-1">€{item.ingresos}</div>
                                                    <div 
                                                        className="w-full bg-blue-500 rounded-t-lg"
                                                        style={{ height: `${(item.ingresos / 7000) * 100}%`, minHeight: '10px' }}
                                                    />
                                                    <div className="text-xs mt-2">{item.mes}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Distribución por Estado</h3>
                                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="flex flex-col gap-3 mb-4">
                                                {[
                                                    { name: 'Pagado', value: invoices.filter(i => i.status === 'pagado').length, color: '#10b981' },
                                                    { name: 'Pendiente', value: invoices.filter(i => i.status === 'pendiente').length, color: '#f59e0b' },
                                                    { name: 'Vencido', value: invoices.filter(i => i.status === 'vencido').length, color: '#ef4444' }
                                                ].map(item => (
                                                    <div className="flex items-center gap-2" key={item.name}>
                                                        <div 
                                                            className="w-4 h-4 rounded-full"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                        <span>{item.name}: {item.value} facturas</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Resumen Financiero</h3>
                                    <Card>
                                        <CardContent className="p-6 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Total Facturado:</span>
                                                <span className="font-semibold">€{invoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Pagado:</span>
                                                <span className="font-semibold text-green-600">€{stats.totalIncome.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Por Cobrar:</span>
                                                <span className="font-semibold text-yellow-600">€{stats.pending.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Vencido:</span>
                                                <span className="font-semibold text-red-600">€{stats.overdue.toFixed(2)}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
            
            {/* New Invoice Dialog */}
            <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Nueva Factura</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4 px-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="patient">Paciente</Label>
                                <Select
                                    id="patient"
                                    value={newInvoice.patientName}
                                    onChange={(e) => setNewInvoice({...newInvoice, patientName: e.target.value})}
                                >
                                    <option value="">Seleccionar paciente</option>
                                    <option value="María González">María González</option>
                                    <option value="Juan Pérez">Juan Pérez</option>
                                    <option value="Ana Martínez">Ana Martínez</option>
                                    <option value="Carlos Ruiz">Carlos Ruiz</option>
                                    <option value="Laura Sánchez">Laura Sánchez</option>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="insurance">Seguro Médico</Label>
                                <Select
                                    id="insurance"
                                    value={newInvoice.insurance}
                                    onChange={(e) => setNewInvoice({...newInvoice, insurance: e.target.value})}
                                >
                                    <option value="Sin seguro">Sin seguro</option>
                                    <option value="Seguro Salud Plus">Seguro Salud Plus</option>
                                    <option value="Medicare Premium">Medicare Premium</option>
                                    <option value="Asistencia Básica">Asistencia Básica</option>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label>Conceptos</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addInvoiceItem}
                                >
                                    <i className="fas fa-plus mr-1"></i>
                                    Agregar Item
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {newInvoice.items.map((item, index) => (
                                    <div className="flex gap-2 items-center" key={index}>
                                        <Input
                                            placeholder="Descripción del servicio"
                                            value={item.description}
                                            onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                                            className="flex-1"
                                        />
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600">€</span>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="Precio"
                                                value={item.price}
                                                onChange={(e) => updateInvoiceItem(index, 'price', e.target.value)}
                                                className="w-32"
                                            />
                                        </div>
                                        {newInvoice.items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeInvoiceItem(index)}
                                                className="p-2 text-red-500 hover:text-red-700"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg">Total:</span>
                                <span className="text-2xl font-bold">
                                    €{newInvoice.items.reduce((sum, item) => {
                                        const price = parseFloat(item.price) || 0;
                                        return sum + price;
                                    }, 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                        <Button variant="outline" onClick={() => setIsNewInvoiceOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleAddInvoice} variant="primary">
                            <i className="fas fa-file-invoice mr-2"></i>
                            Generar Factura
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// ============ MAIN APP ============
const App = () => {
    const [currentPage, setCurrentPage] = useState('login');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem('theme');
            if (saved) return saved;
        } catch (e) {}
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    });

    const [bgChoice, setBgChoice] = useState(() => {
        try {
            const saved = localStorage.getItem('bgChoice');
            if (saved) return saved;
        } catch (e) {}
        return 'fondo1';
    });

    useEffect(() => {
        try {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            localStorage.setItem('theme', theme);
        } catch (e) {}
    }, [theme]);

    useEffect(() => {
        try {
            localStorage.setItem('bgChoice', bgChoice);
        } catch (e) {}
    }, [bgChoice]);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setCurrentPage('patients');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentPage('login');
    };

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    // Render current page based on state
    const renderPage = () => {
        if (!isAuthenticated) {
            return <Login onLogin={handleLogin} bgChoice={bgChoice} />;
        }

        let content;
        switch (currentPage) {
            case 'patients':
                content = <PatientManagement />;
                break;
            case 'appointments':
                content = <AppointmentSchedule />;
                break;
            case 'billing':
                content = <BillingPayments />;
                break;
            default:
                content = <PatientManagement />;
        }

        return (
            <Dashboard 
                currentPage={currentPage} 
                onLogout={handleLogout}
                onNavigate={handleNavigate}
                theme={theme}
                onSetTheme={(t) => setTheme(t)}
                bgChoice={bgChoice}
                onSetBgChoice={(b) => setBgChoice(b)}
            >
                {content}
            </Dashboard>
        );
    };

    return renderPage();
};

// ============ RENDER APP ============
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);